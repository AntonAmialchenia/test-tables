import { requestGet, requestPost, requestPut } from '../requests';
import { Application, ApplicationFilters, RequestFile } from './type';

export type { Application, RequestFile, ApplicationFilters };

const url = 'http://localhost:3000/applications';

export const getApplications = (params?: ApplicationFilters) =>
  requestGet<Application[]>(url, params);

export const createApplication = (params: Application) =>
  requestPost(url, params);

export const updateApplication = (params: Application) => requestPut(url, params);
