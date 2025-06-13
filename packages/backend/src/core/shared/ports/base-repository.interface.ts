export interface BaseRepositoryPort<T> {
  create(entity: T): Promise<T>;
  find(): Promise<T[]>;
  getById(id: string): Promise<T>;
  deleteById(id: string): Promise<T>;
}
