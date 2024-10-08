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
  for_removal?: boolean;
}

export interface ApplicationResponse extends Application {
  id: string;
}
