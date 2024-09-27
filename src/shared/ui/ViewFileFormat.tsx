import { FC } from 'react';
import { RequestFile } from '../api';
import { FileFormats } from '../enums';
import { currentColor } from '../lib';

interface ViewFileFormatProps {
  file: RequestFile;
  className?: string;
}

export const ViewFileFormat: FC<ViewFileFormatProps> = (props) => {
  const { file, className } = props;
  const fileFormat = file.file_name.split('.')[1];

  const isImage =
    fileFormat === FileFormats.JPG || fileFormat === FileFormats.PNG;

  return (
    <div>
      {isImage ? (
        <img className="w-20 h-20 mb-1" src={file.file_data} alt="image" />
      ) : (
        <div
          className={`w-20 h-20 border-4 rounded-lg flex items-center justify-center mb-1 font-semibold ${className} ${currentColor(
            fileFormat,
          )}`}>
          {fileFormat}
        </div>
      )}
      <p className="break-all max-w-20">{file.file_name}</p>
    </div>
  );
};
