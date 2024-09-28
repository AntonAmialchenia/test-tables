import dayjs from 'dayjs';
import { RecordStatus, TaxPeriod } from '../../../shared';

export interface ArchiveFilterState {
  status: RecordStatus | null;
  setStatus: (status: RecordStatus | null) => void;
  dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null;
  setDateRange: (
    dateRange: [dayjs.Dayjs | null, dayjs.Dayjs | null] | null,
  ) => void;
  taxPeriod: TaxPeriod | null;
  setTaxPeriod: (taxPeriod: TaxPeriod | null) => void;
  timeRange: 'day' | 'week' | 'month' | null;
  setTimeRange: (timeRange: 'day' | 'week' | 'month' | null) => void;
  resetFilters: () => void;
}
