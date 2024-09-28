import { FC, useState } from 'react';
import { DocumentFile, RequestFile } from '../api';
import { FileFormats } from '../enums';
import {
  currentColor,
  getMimeType,
  IMAGE_FORMATS,
  UNSUPPORTED_PREVIEW_FORMATS,
} from '../lib';
import { Download, Eye } from '../icons';

interface ViewFileFormatProps {
  file: RequestFile | DocumentFile;
  className?: string;
  isEdit?: boolean;
}

export const ViewFileFormat: FC<ViewFileFormatProps> = (props) => {
  const { file, className, isEdit } = props;
  const [isOpen, setIsOpen] = useState(false);
  const fileFormat = file.file_name?.split('.')[1];

  const isImage =
    fileFormat === FileFormats.JPG || fileFormat === FileFormats.PNG;

  const viewFile = () => {
    setIsOpen(true);
  };

  const renderFilePreview = () => {
    const fileData = (file as RequestFile).file_data;

    if (IMAGE_FORMATS.includes(fileFormat as FileFormats)) {
      return (
        <img
          src={fileData}
          alt={file.file_name}
          className="w-[500px] h-[500px]"
        />
      );
    }

    if (fileFormat === FileFormats.PDF) {
      return <iframe src={fileData} className="w-[500px] h-[500px]" />;
    }

    if (UNSUPPORTED_PREVIEW_FORMATS.includes(fileFormat as FileFormats)) {
      return (
        <p>
          Предпросмотр для этого типа файла недоступен. Пожалуйста, скачайте
          файл для просмотра.
        </p>
      );
    }

    return <p>Неподдерживаемый формат файла.</p>;
  };

  const downloadFile = () => {
    const fileData = (file as RequestFile).file_data;
    const fileFormat = file.file_name
      .split('.')
      .pop()
      ?.toLowerCase() as FileFormats;

    const mimeType = getMimeType(fileFormat);
    if (fileData) {
      const byteString = atob(fileData.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`relative  ${isEdit ? '' : 'group'}`}>
      {isImage ? (
        <img
          className="w-28 h-28 mb-1"
          src={(file as RequestFile).file_data || file.file_name}
          alt="image"
        />
      ) : (
        <div
          className={`w-28 h-28 border-4 rounded-lg flex items-center justify-center mb-1 font-semibold ${className} ${currentColor(
            fileFormat,
          )}`}>
          {fileFormat}
        </div>
      )}
      <p className="break-all max-w-28">{file.file_name}</p>

      <div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Download
          onClick={downloadFile}
          className="h-6 w-6 cursor-pointer text-white mx-2"
        />
        <Eye
          onClick={viewFile}
          className="h-6 w-6 cursor-pointer text-white mx-2"
        />
      </div>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="max-w-[1200px] max-h-[732px] rounded-xl bg-white p-4">
            {renderFilePreview()}
          </div>
        </div>
      )}
    </div>
  );
};
