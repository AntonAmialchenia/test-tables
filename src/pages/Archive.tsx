import {
  ConfigProvider,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
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
import { useFeedbackStore, useFilters } from '../entities';
import { ArchiveModal, FilterPanel } from '../features';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import ruRU from 'antd/lib/locale/ru_RU';

dayjs.extend(isBetween);

const Archive = () => {
  const { setModalNotification, setModalViewsTypes } = useFeedbackStore();
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const { status, dateRange, taxPeriod, timeRange } = useFilters();

  const [totalCount, setTotalCount] = useState(0);
  const [filteredApplications, setFilteredApplications] = useState<Document[]>(
    [],
  );

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

  const filterApplications = useCallback(
    (applications: Document[]) => {
      return applications.filter((app) => {
        const dateInRange = dateRange
          ? dayjs(app.document_date).isBetween(
              dateRange[0],
              dateRange[1],
              null,
              '[]',
            )
          : true;
        const statusMatch = status ? app.record_status === status : true;
        const taxPeriodMatch = taxPeriod ? app.tax_period === taxPeriod : true;
        const timeRangeMatch = timeRange
          ? dayjs(app.document_date).isAfter(dayjs().subtract(1, timeRange))
          : true;

        return dateInRange && statusMatch && taxPeriodMatch && timeRangeMatch;
      });
    },
    [dateRange, status, taxPeriod, timeRange],
  );

  useEffect(() => {
    if (archiveApplications) {
      const filtered = filterApplications(archiveApplications);
      setFilteredApplications(filtered);
      setTotalCount(filtered.length);
    }
  }, [archiveApplications, filterApplications]);

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
      render: (date: string) => formatDate(date, 'DD.MM.YYYY'),
      sorter: (a, b) =>
        dayjs(a.document_date).unix() - dayjs(b.document_date).unix(),
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
      <FilterPanel />
      <ConfigProvider locale={ruRU}>
        <Table
          columns={columns}
          dataSource={filteredApplications}
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
      </ConfigProvider>
    </div>
  );
};

export default Archive;
