import { useQuery } from '@tanstack/react-query';
import { Table, TableColumnsType, TablePaginationConfig } from 'antd';
import { useCallback, useState } from 'react';
import { Application, formatDate, getApplications } from '../shared';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

export const Applications = () => {
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

  const columns: TableColumnsType<Application> = [
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
      <Table
        columns={columns}
        dataSource={applications}
        onChange={handlePaginationChange}
        loading={isLoading}
        scroll={{ y: '670px' }}
        onRow={(record) => ({
          onClick: () => {
            console.log(record);
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
