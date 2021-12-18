export type GetListRequest<T> = {
  page?: number;
  pageSize?: number;
  searchTerm?: string;
  sortBy?: keyof T & string;
  sortDirection?: 'asc' | 'desc';
};
