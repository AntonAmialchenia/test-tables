import { useQuery } from '@tanstack/react-query';
import { Button, Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { useCallback, useState } from 'react';
import {
  ApplicationResponse,
  formatDate,
  getApplications,
  ModalViewsTypes,
} from '../shared';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useFeedbackStore } from '../entities';
import { ApplicationModal } from '../features';

export const Applications = () => {
  const { setModalNotification, setModalViewsTypes } = useFeedbackStore();
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [totalCount, setTotalCount] = useState(0);

  const fetchApplicationList = useCallback(async () => {
    const response = await getApplications();
    if (response) {
      setTotalCount(response.length);
      return response;
    }
    return [];
  }, []);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: fetchApplicationList,
  });

  const handlePaginationChange = (newPagination: TablePaginationConfig) => {
    const { current, pageSize } = newPagination;
    setPagination((prev) => ({
      ...prev,
      offset: ((current ?? 1) - 1) * (pageSize ?? prev.limit),
      limit: pageSize ?? prev.limit,
    }));
  };

  const handleOpenModal = (
    type: ModalViewsTypes,
    record?: ApplicationResponse,
  ) => {
    setModalNotification({
      show: true,
      title: <h3 className="mb-3">Заявка</h3>,
      content: <ApplicationModal application={record} />,
      width: '100%',
    });
    setModalViewsTypes(type);
  };

  const columns: TableColumnsType<ApplicationResponse> = [
    {
      title: 'Дата',
      key: 'request_date',
      dataIndex: 'request_date',
      render: (date: string) => formatDate(date, 'dd.MM.yyyy'),
    },
    {
      title: 'Статус обработки заявки',
      key: 'request_processed',
      dataIndex: 'request_processed',
      render: (processed: boolean) =>
        processed ? (
          <CheckOutlined className="text-green-600" />
        ) : (
          <CloseOutlined className="text-red-600" />
        ),
    },
    {
      title: 'Комментарий',
      key: 'request_comment',
      dataIndex: 'request_comment',
    },
  ];

  return (
    <div className="h-full">
      <Button
        className="mb-5"
        type="primary"
        onClick={() => handleOpenModal(ModalViewsTypes.CREATE_APPLICATION)}>
        Создать заявку
      </Button>
      <Table
        columns={columns}
        dataSource={applications}
        onChange={handlePaginationChange}
        loading={isLoading}
        scroll={{ y: '670px' }}
        onRow={(record) => ({
          onClick: () => {
            handleOpenModal(ModalViewsTypes.UPDATE_APPLICATION, record);
          },
        })}
        pagination={{
          current: pagination.offset / pagination.limit + 1,
          pageSize: pagination.limit,
          total: totalCount,
          showSizeChanger: true,
          showQuickJumper: true,
          pageSizeOptions: ['10', '20', '30', '40'],
        }}
      />
    </div>
  );
};
