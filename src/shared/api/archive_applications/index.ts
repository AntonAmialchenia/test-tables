import { Document, DocumentFile } from './type';
import { requestGet } from '../requests';

export type { Document, DocumentFile };

const url = 'http://localhost:3000/archive_applications';

export const getArchiveApplications = () => requestGet<Document[]>(url);
