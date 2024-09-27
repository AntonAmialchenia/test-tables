import { DateTime } from 'luxon';
import { FileFormats, TaxPeriod } from '../enums';

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

export const currentColor = (fileFormat: string) => {
  switch (fileFormat) {
    case FileFormats.PDF:
      return 'text-red-500 border-red-500';
    case FileFormats.DOC:
    case FileFormats.BMP:
    case FileFormats.DOCX:
    case FileFormats.RTF:
    case FileFormats.TIFF:
      return 'text-[#e5e7eb]';
    case FileFormats.XLS:
    case FileFormats.XLSX:
      return 'text-green-500 border-green-500';
    default:
      return '';
  }
};

export const getMimeType = (fileFormat: FileFormats): string => {
  const mimeTypes: Record<FileFormats, string> = {
    [FileFormats.JPG]: 'image/jpeg',
    [FileFormats.PNG]: 'image/png',
    [FileFormats.BMP]: 'image/bmp',
    [FileFormats.TIFF]: 'image/tiff',
    [FileFormats.PDF]: 'application/pdf',
    [FileFormats.DOC]: 'application/msword',
    [FileFormats.DOCX]:
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    [FileFormats.RTF]: 'application/rtf',
    [FileFormats.XLS]: 'application/vnd.ms-excel',
    [FileFormats.XLSX]:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  };

  return mimeTypes[fileFormat] || 'application/octet-stream';
};

export const IMAGE_FORMATS = [
  FileFormats.JPG,
  FileFormats.PNG,
  FileFormats.BMP,
  FileFormats.TIFF,
];

export const UNSUPPORTED_PREVIEW_FORMATS = [
  FileFormats.DOC,
  FileFormats.DOCX,
  FileFormats.RTF,
  FileFormats.XLS,
  FileFormats.XLSX,
];
