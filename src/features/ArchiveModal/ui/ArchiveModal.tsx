import { FC } from 'react';
import {
  Document,
  formatDate,
  StatusIcon,
  DocumentType,
  translateTaxPeriod,
  ViewFileFormat,
  RecordStatus,
} from '../../../shared';
import { Flex } from 'antd';

interface ArchiveModalProps {
  document: Document;
}

export const ArchiveModal: FC<ArchiveModalProps> = (props) => {
  const { document } = props;

  return (
    <div>
      <Flex className="mb-6" gap={20}>
        <p className="font-semibold">
          {formatDate(document.document_date, 'dd.MM.yyyy')}
        </p>
        <p className="font-semibold">{document.organization_name}</p>
        <StatusIcon status={document.record_status} />
        {document.record_status === RecordStatus.REJECTED && (
          <p>
            <span className="font-semibold">Причина отказа: </span>
            {document.record_status_comment}
          </p>
        )}
      </Flex>
      <Flex gap={20}>
        <p>
          <span className="font-semibold">Дата документа: </span>
          {formatDate(document.document_date, 'dd.MM.yyyy')}
        </p>
        <p>
          <span className="font-semibold">Номер: </span>
          {document.document_number}
        </p>
        <p>
          <span className="font-semibold">Тип: </span>
          {document.document_type === DocumentType.IN
            ? 'Входящий'
            : 'Исходящий'}
        </p>
      </Flex>

      <Flex className="mb-3" gap={20}>
        <p>
          <span className="font-semibold">Налоговый период: </span>
          {translateTaxPeriod(document.tax_period)}
        </p>
        <p>
          <span className="font-semibold">Конец периода: </span>
          {formatDate(document.tax_period_end_date, 'dd.MM.yyyy')}
        </p>
      </Flex>
      <p className="mb-8">
        <span className="font-semibold">Год: </span>
        {formatDate(document.document_date, 'yyyy')}
      </p>
      <Flex className="mb-5" gap={10} align="center">
        <p>{document.files.length} файлов</p>
        <div className="grow h-px bg-black" />
      </Flex>
      <Flex className="mb-10" wrap gap={10}>
        {document.files.map((file) => (
          <ViewFileFormat key={file.file_name} file={file} />
        ))}
      </Flex>
      <p className="text-lg font-medium mb-3">Примечание</p>
      <p className="mb-3">{document.record_comment}</p>
    </div>
  );
};
