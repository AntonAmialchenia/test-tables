export const enum AppRoutes {
  HOME = '/',
  APPLICATIONS = '/applications',
  ARCHIVE = '/archive',
  NOT_FOUND = '*'
}

export const enum RecordStatus {
  NEW = 'NEW',
  IN_PROCESS = 'IN_PROCESS',
  FINISHED = 'FINISHED',
  REJECTED = 'REJECTED',
}

export const enum DocumentType {
  IN = 'IN',
  OUT = 'OUT',
}

export enum TaxPeriod {
  PERIOD_MONTH = 'PERIOD_MONTH',
  PERIOD_Q1 = 'PERIOD_Q1',
  PERIOD_Q2 = 'PERIOD_Q2',
  PERIOD_Q3 = 'PERIOD_Q3',
  PERIOD_Q4 = 'PERIOD_Q4',
  PERIOD_YEAR = 'PERIOD_YEAR',
}

export const enum AlertNotificationTypes {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export const enum ModalViewsTypes {
  VIEW_ARCHIVED_APPLICATION = 'VIEW_ARCHIVED_APPLICATION',
  VIEW_APPLICATION = 'VIEW_APPLICATION',
  CREATE_APPLICATION = 'CREATE_APPLICATION',
  UPDATE_APPLICATION = 'UPDATE_APPLICATION',
}

export enum FileFormats {
  JPG = 'jpg',
  PNG = 'png',
  BMP = 'bpm',
  TIFF = 'tiff',
  PDF = 'pdf',
  DOC = 'doc',
  DOCX = 'docx',
  RTF = 'rtf',
  XLS = 'xls',
  XLSX = 'xlsx',
}
