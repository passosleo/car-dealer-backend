export interface Paginated<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}
