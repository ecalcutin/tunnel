export abstract class BaseRepositoryPort<T> {
  abstract create(entity: T): Promise<T>;
  abstract find(): Promise<T[]>;
  abstract getById(id: string): Promise<T>;
  abstract deleteById(id: string): Promise<T>;
}
