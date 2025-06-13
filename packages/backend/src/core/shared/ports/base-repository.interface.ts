export interface BaseRepositoryPort<T> {
  find(): Promise<T[]>;
}
