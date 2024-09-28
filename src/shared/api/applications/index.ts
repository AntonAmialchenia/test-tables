import { requestGet, requestPost, requestPut } from '../requests';
import { Application, ApplicationResponse, RequestFile } from './type';

export type { Application, RequestFile, ApplicationResponse };

const url = 'http://localhost:3000/applications';

export const getApplications = () => requestGet<ApplicationResponse[]>(url);

export const createApplication = (params: Application) =>
  requestPost<ApplicationResponse>(url, params);

export const updateApplication = (params: ApplicationResponse) =>
  requestPut<ApplicationResponse>(`${url}/${params.id}`, params);
