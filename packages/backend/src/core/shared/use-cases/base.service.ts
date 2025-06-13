import { BaseRepositoryPort } from '../ports';

export abstract class BaseService<Entity> {
  constructor(private readonly repository: BaseRepositoryPort<Entity>) {}

  public async create(entity: Entity): Promise<Entity> {
    return this.repository.create(entity);
  }

  public async find(): Promise<Entity[]> {
    return this.repository.find();
  }

  public async getById(id: string): Promise<Entity> {
    return this.repository.getById(id);
  }

  public async deleteById(id: string): Promise<Entity> {
    return this.repository.deleteById(id);
  }
}
