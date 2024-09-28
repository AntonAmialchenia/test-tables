import { FC, useEffect, useState } from 'react';
import {
  Application,
  createApplication,
  formatDate,
  ModalViewsTypes,
  ViewFileFormat,
  AlertNotificationTypes,
  updateApplication,
  ApplicationResponse,
  RecordStatus,
} from '../../../shared';
import { Button, Flex, Input, Upload } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { PlusOutlined } from '@ant-design/icons';
import { useFeedbackStore, useFilters } from '../../../entities';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ERROR_CREATE_MESSAGE,
  ERROR_UPDATE_MESSAGE,
  NO_DATA_FOR_UPDATE_MESSAGE,
  SUCCESS_CREATE_MESSAGE,
  SUCCESS_UPDATE_MESSAGE,
} from '../lib';
import { useFileHandling } from '../hooks';
import { useNavigate } from 'react-router-dom';

interface ApplicationModalProps {
  application?: ApplicationResponse;
  className?: string;
}

export const ApplicationModal: FC<ApplicationModalProps> = (props) => {
  const { className, application } = props;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const modalViewsTypes = useFeedbackStore((state) => state.modalViewsTypes);
  const { showAlert, closeModal } = useFeedbackStore();
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState('');
  const {
    filePreviews,
    setFilePreviews,
    getAcceptedFileFormats,
    handleFileUpload,
  } = useFileHandling();
  const { setStatus } = useFilters();

  const isUpdateApplication =
    modalViewsTypes === ModalViewsTypes.UPDATE_APPLICATION;
  const isCreateApplication =
    modalViewsTypes === ModalViewsTypes.CREATE_APPLICATION;

  const toggleEdit = () => setIsEdit((prev) => !prev);

  const handleProcessedClick = () => {
    setStatus(RecordStatus.FINISHED);
    navigate('/archive')
    closeModal();
  };

  // В зависимости от ответа  сервера показываем уведомление
  const showNotification = (
    res: ApplicationResponse | undefined,
    successText: string,
    errorText: string,
  ) => {
    if (res) {
      showAlert({
        message: successText,
        alertType: AlertNotificationTypes.SUCCESS,
        show: true,
      });
      setFilePreviews([]);
      setComment('');
      setIsEdit(false);
      void queryClient.invalidateQueries({ queryKey: ['applications'] });
      closeModal();
    } else {
      showAlert({
        message: errorText,
        alertType: AlertNotificationTypes.ERROR,
        show: true,
      });
    }
  };

  // Мутация для создания заявки
  const createMutation = useMutation({
    mutationFn: createApplication,
    onSuccess: (data) => {
      showNotification(data, SUCCESS_CREATE_MESSAGE, ERROR_CREATE_MESSAGE);
    },
    onError: () => {
      showAlert({
        message: ERROR_CREATE_MESSAGE,
        alertType: AlertNotificationTypes.ERROR,
        show: true,
      });
    },
  });

  // Мутация для обновления заявки
  const updateMutation = useMutation({
    mutationFn: updateApplication,
    onSuccess: (data) => {
      showNotification(data, SUCCESS_UPDATE_MESSAGE, ERROR_UPDATE_MESSAGE);
    },
    onError: () => {
      showAlert({
        message: ERROR_UPDATE_MESSAGE,
        alertType: AlertNotificationTypes.ERROR,
        show: true,
      });
    },
  });

  const handleApplicationCreate = async () => {
    const params: Application = {
      request_date: new Date().toISOString(),
      request_comment: comment,
      request_processed: false,
      files: filePreviews,
      request_guid: uuidv4(),
    };
    createMutation.mutate(params);
  };

  const handleApplicationUpdate = async (forRemoval = false) => {
    if (!application) {
      showAlert({
        message: NO_DATA_FOR_UPDATE_MESSAGE,
        alertType: AlertNotificationTypes.ERROR,
        show: true,
      });
      return;
    }

    const params: ApplicationResponse = {
      ...application,
      request_comment: forRemoval ? application.request_comment : comment,
      files: forRemoval ? application.files : filePreviews,
      for_removal: forRemoval,
    };
    updateMutation.mutate(params);
  };

  useEffect(() => {
    if (application) {
      setFilePreviews(application.files);
      setComment(application.request_comment);
      setIsEdit(false);
    } else {
      setFilePreviews([]);
      setComment('');
      setIsEdit(false);
    }
  }, [application, modalViewsTypes, setFilePreviews]);

  return (
    <div className={className}>
      {application && (
        <Flex className="mb-6" justify="space-between" align="center">
          <Flex align="center" gap={20}>
            {application.request_processed && (
              <div
                onClick={handleProcessedClick}
                className="border-4 border-green-400 rounded-lg text-green-400 font-semibold px-2 cursor-pointer">
                Обработана
              </div>
            )}
            <p>{formatDate(application.request_date, 'DD.MM.YYYY')}</p>
          </Flex>

          <Flex gap={20}>
            {isUpdateApplication && !application.request_processed && (
              <>
                <Button onClick={toggleEdit}>
                  {isEdit ? 'Отменить' : 'Редактировать'}
                </Button>
                {!application.for_removal && (
                  <Button danger onClick={() => handleApplicationUpdate(true)}>
                    Пометить на удаление
                  </Button>
                )}
              </>
            )}
            {!application.request_processed && application.for_removal && (
              <Flex
                align="center"
                className="border-2 border-red-400 rounded-md px-2 text-red-400">
                На удалении
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
      <Flex className="mb-5" gap={10} align="center">
        <p>{filePreviews.length} файлов</p>
        <div className="grow h-px bg-black" />
      </Flex>

      <Flex className="mb-10" wrap gap={10}>
        {filePreviews.map((file) => (
          <ViewFileFormat key={file.file_name} isEdit={isEdit} file={file} />
        ))}
        {(isCreateApplication || isEdit) && (
          <Upload
            beforeUpload={handleFileUpload}
            fileList={[]}
            accept={getAcceptedFileFormats()}>
            <Button icon={<PlusOutlined />}>Загрузить файл</Button>
          </Upload>
        )}
      </Flex>
      <p className="text-lg font-medium mb-3">Примечание</p>
      {isEdit || isCreateApplication ? (
        <Input.TextArea
          className="w-1/2 mb-3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      ) : (
        <p className="mb-3">{application?.request_comment}</p>
      )}

      {(isCreateApplication || (!application?.request_processed && isEdit)) && (
        <Button
          type="primary"
          className="block"
          onClick={() =>
            isUpdateApplication
              ? handleApplicationUpdate()
              : handleApplicationCreate()
          }>
          {isUpdateApplication ? 'Обновить заявку' : 'Создать заявку'}
        </Button>
      )}
    </div>
  );
};
