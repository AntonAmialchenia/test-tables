import { useState } from 'react';
import { Upload } from 'antd';
import { useFeedbackStore } from '../../../entities';
import {
  AlertNotificationTypes,
  FileFormats,
  RequestFile,
} from '../../../shared';
import { MAX_FILE_SIZE } from '../lib';

export const useFileHandling = () => {
  const [filePreviews, setFilePreviews] = useState<RequestFile[]>([]);
  const { showAlert } = useFeedbackStore();

  const handleFileUpload = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      showAlert({
        message: 'Размер файла не должен превышать 3 МБ',
        alertType: AlertNotificationTypes.ERROR,
        show: true,
      });
      return Upload.LIST_IGNORE;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (
      fileExtension &&
      Object.values(FileFormats).includes(fileExtension as FileFormats)
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Data = e.target?.result as string;
        const newFile: RequestFile = {
          file_name: file.name,
          file_data: base64Data,
        };
        setFilePreviews((prev) => [...prev, newFile]);
      };
      reader.readAsDataURL(file);
      return false;
    }
    return Upload.LIST_IGNORE;
  };

  const getAcceptedFileFormats = () => {
    return Object.values(FileFormats)
      .map((format) => `.${format}`)
      .join(',');
  };

  return {
    filePreviews,
    setFilePreviews,
    handleFileUpload,
    getAcceptedFileFormats,
  };
};
