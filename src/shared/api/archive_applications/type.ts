import { RecordStatus, TaxPeriod, DocumentType } from '../../enums';
import { RequestFile } from '../applications';

export interface DocumentFile extends RequestFile {
  file_presentation: string;
}

export interface Document {
  request_guid: string;
  document_date: string;
  document_number: string;
  document_presentation: string;
  document_presentation_guid: string;
  document_type: DocumentType;
  record_date: string;
  record_status: RecordStatus;
  record_status_comment: string;
  record_comment: string;
  organization_name: string;
  organization_guid: string;
  tax_period: TaxPeriod;
  tax_period_end_date: string;
  files: DocumentFile[];
}
