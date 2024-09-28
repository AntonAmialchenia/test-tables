import { RecordStatus } from '../../../shared';

export const timeRanges = [
  { value: 'today', label: 'Сегодня' },
  { value: 'week', label: 'Неделя' },
  { value: 'month', label: 'Месяц' },
];

export const statusButtons = [
  { value: RecordStatus.IN_PROCESS, label: 'В процессе' },
  { value: RecordStatus.FINISHED, label: 'Завершено' },
  { value: RecordStatus.REJECTED, label: 'Отклонено' },
];
