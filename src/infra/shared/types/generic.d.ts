export interface Paginated<T> {
  total: number;
  page: number;
  totalPages: number;
  limit: number;
  items: T[];
}
