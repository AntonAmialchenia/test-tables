export interface RequestFile {
  file_name: string;
  file_data: string;
}

export interface Application {
  request_guid: string;
  request_date: string;
  request_comment: string;
  request_processed: boolean;
  files: RequestFile[];
}

export interface ApplicationFilters {
  request_guid?: string;
  request_date?: string;
  request_comment?: string;
  request_processed?: boolean;
}
