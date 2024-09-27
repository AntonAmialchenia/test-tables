import { requestGet, requestPost, requestPut } from '../requests';
import {
  Application,
  ApplicationFilters,
  ApplicationResponse,
  RequestFile,
} from './type';

export type { Application, RequestFile, ApplicationFilters, ApplicationResponse };

const url = 'http://localhost:3000/applications';

export const getApplications = (params?: ApplicationFilters) =>
  requestGet<ApplicationResponse[]>(url, params);

export const createApplication = (params: Application) =>
  requestPost<ApplicationResponse>(url, params);

export const updateApplication = (params: ApplicationResponse) =>
  requestPut<ApplicationResponse>(`${url}/${params.id}`, params);
