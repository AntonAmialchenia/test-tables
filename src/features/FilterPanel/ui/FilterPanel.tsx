import { DatePicker, Radio, Select, Flex, Button } from 'antd';
import { StatusIcon, TaxPeriod, translateTaxPeriod } from '../../../shared';
import { statusButtons, timeRanges } from '../lib/constants';
import { useFilters } from '../../../entities';
import locale from 'antd/es/date-picker/locale/ru_RU';

export const FilterPanel = () => {
  const {
    setDateRange,
    dateRange,
    setTimeRange,
    timeRange,
    setStatus,
    setTaxPeriod,
    status,
    taxPeriod,
    resetFilters,
  } = useFilters();

  return (
    <Flex gap={26} vertical className="mb-7">
      <Flex gap={26}>
        <div>
          <p className="font-medium mb-3">Период</p>
          <DatePicker.RangePicker
            locale={locale}
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
          />
        </div>
        <div>
          <p className="font-medium mb-3">Быстрый преход</p>
          <Radio.Group
            onChange={(e) => setTimeRange(e.target.value)}
            value={timeRange}>
            {timeRanges.map((item) => (
              <Radio.Button value={item.value}>{item.label}</Radio.Button>
            ))}
          </Radio.Group>
        </div>
        {(dateRange || timeRange || status || taxPeriod) && (
          <Button onClick={resetFilters} type="primary">
            Сбросить фильтры
          </Button>
        )}
      </Flex>
      <Flex gap={26}>
        <div>
          <p className="font-medium mb-3">Статус заявки</p>
          <Radio.Group
            onChange={(e) => setStatus(e.target.value)}
            value={status}>
            {statusButtons.map((item) => (
              <Radio.Button value={item.value}>
                <StatusIcon status={item.value} />
                <span className="ml-2">{item.label}</span>
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div>
          <p className="font-medium mb-3">Налоговый период</p>
          <Select
            className="w-[300px]"
            placeholder="Выберите налоговый период"
            onChange={(value) => setTaxPeriod(value)}>
            {Object.values(TaxPeriod).map((period) => (
              <Select.Option key={period} value={period}>
                {translateTaxPeriod(period)}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Flex>
    </Flex>
  );
};
