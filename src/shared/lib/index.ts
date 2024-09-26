import { DateTime } from 'luxon';
import { TaxPeriod } from '../enums';

export const formatDate = (date: string, format: string): string => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return DateTime.fromISO(date).setZone(timezone).toFormat(format);
};

export const translateTaxPeriod = (taxPeriod: TaxPeriod): string => {
  switch (taxPeriod) {
    case TaxPeriod.PERIOD_MONTH:
      return 'месяц';
    case TaxPeriod.PERIOD_Q1:
      return '1 квартал';
    case TaxPeriod.PERIOD_Q2:
      return '2 квартала';
    case TaxPeriod.PERIOD_Q3:
      return '5 квартала';
    case TaxPeriod.PERIOD_Q4:
      return '4 квартала';
    case TaxPeriod.PERIOD_YEAR:
      return 'год';
    default:
      return '';
  }
};
