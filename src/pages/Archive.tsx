import { Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { useCallback, useState } from 'react';
import {
  formatDate,
  getArchiveApplications,
  Document,
  DocumentType,
  TaxPeriod,
  translateTaxPeriod,
  RecordStatus,
  StatusIcon,
  ModalViewsTypes,
} from '../shared';
import { useQuery } from '@tanstack/react-query';
import { useFeedbackStore } from '../entities';
import { ArchiveModal } from '../features';

export const Archive = () => {
  const { setModalNotification, setModalViewsTypes } = useFeedbackStore();
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [totalCount, setTotalCount] = useState(0);

  const fetchArchiveApplicationList = useCallback(async () => {
    const response = await getArchiveApplications();
    if (response) {
      setTotalCount(response.length);
      return response;
    }
    return [];
  }, []);

  const { data: archiveApplications, isLoading } = useQuery({
    queryKey: ['archiveApplications'],
    queryFn: fetchArchiveApplicationList,
  });

  const handlePaginationChange = (newPagination: TablePaginationConfig) => {
    const { current, pageSize } = newPagination;
    setPagination((prev) => ({
      ...prev,
      offset: ((current ?? 1) - 1) * (pageSize ?? prev.limit),
      limit: pageSize ?? prev.limit,
    }));
  };

  const handleOpenModal = (record: Document) => {
    setModalNotification({
      show: true,
      title: <h3 className="mb-3">Архив документов</h3>,
      content: <ArchiveModal document={record} />,
      width: '100%',
    });
    setModalViewsTypes(ModalViewsTypes.VIEW_ARCHIVED_APPLICATION);
  };

  const columns: TableColumnsType<Document> = [
    {
      title: 'Дата исходного документа',
      key: 'document_date',
      dataIndex: 'document_date',
      render: (date: string) => formatDate(date, 'dd.MM.yyyy'),
    },
    {
      title: 'Статус заявки',
      key: 'record_status',
      dataIndex: 'record_status',
      render: (status: RecordStatus) => <StatusIcon status={status} />,
    },
    {
      title: 'Номер исходного документа',
      key: 'document_number',
      dataIndex: 'document_number',
    },
    {
      title: 'Тип исходного документа',
      key: 'document_type',
      dataIndex: 'document_type',
      render: (type: string) =>
        type === DocumentType.IN ? 'Входящий' : 'Исходящий',
    },
    {
      title: 'Имя организации',
      key: 'organization_name',
      dataIndex: 'organization_name',
    },
    {
      title: 'Налоговый период',
      key: 'tax_period',
      dataIndex: 'tax_period',
      render: (taxPeriod: TaxPeriod) => translateTaxPeriod(taxPeriod),
    },
  ];

  return (
    <div className="h-full">
      <Table
        columns={columns}
        dataSource={archiveApplications}
        onChange={handlePaginationChange}
        loading={isLoading}
        scroll={{ y: '670px' }}
        onRow={(record) => ({
          onClick: () => {
            handleOpenModal(record);
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
