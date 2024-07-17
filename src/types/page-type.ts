interface Page<T> {
  data: T[];
  page: number;
  totalPages: number;
  totalResults: number;
}
