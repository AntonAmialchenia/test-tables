import { useQuery } from '@tanstack/react-query';
import {
  Button,
  ConfigProvider,
  DatePicker,
  Table,
  TableColumnsType,
  TablePaginationConfig,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import {
  ApplicationResponse,
  formatDate,
  getApplications,
  ModalViewsTypes,
} from '../shared';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useFeedbackStore } from '../entities';
import { ApplicationModal } from '../features';
import dayjs from 'dayjs';
import locale from 'antd/es/date-picker/locale/ru_RU';
import ruRU from 'antd/lib/locale/ru_RU';

const Applications = () => {
  const { setModalNotification, setModalViewsTypes } = useFeedbackStore();
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 20,
  });
  const [filteredApplications, setFilteredApplications] = useState<
    ApplicationResponse[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [dateRange, setDateRange] = useState<
    [dayjs.Dayjs | null, dayjs.Dayjs | null] | null
  >(null);

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

  useEffect(() => {
    const filterApplications = () => {
      if (!applications) return;
      let filtered = [...applications];
      if (dateRange && dateRange[0] && dateRange[1]) {
        filtered = filtered.filter((app) => {
          const appDate = dayjs(app.request_date);
          return (
            appDate.isAfter(dateRange[0]) && appDate.isBefore(dateRange[1])
          );
        });
      }
      setFilteredApplications(filtered);
    };
    filterApplications();
  }, [applications, dateRange]);

  const columns: TableColumnsType<ApplicationResponse> = [
    {
      title: 'Дата',
      key: 'request_date',
      dataIndex: 'request_date',
      render: (date: string) => formatDate(date, 'DD.MM.YYYY'),
      sorter: (a, b) =>
        dayjs(a.request_date).unix() - dayjs(b.request_date).unix(),
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
      <div className="mb-5">
        <p className="font-medium mb-3">Период</p>
        <DatePicker.RangePicker
          locale={locale}
          value={dateRange}
          onChange={(dates) => setDateRange(dates)}
        />
      </div>
      <ConfigProvider locale={ruRU}>
        <Table
          columns={columns}
          dataSource={filteredApplications}
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
      </ConfigProvider>
    </div>
  );
};

export default Applications;
