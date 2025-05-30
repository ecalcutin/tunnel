import { Model } from 'mongoose';

export class BaseRepository<T> {
  constructor(protected readonly entityModel: Model<T>) {}

  public async read(): Promise<T[]> {
    return this.entityModel.find().exec();
  }

  public async create(entity: T): Promise<T> {
    const createdEntity = await new this.entityModel(entity).save();
    return createdEntity.toObject();
  }

  public async deleteById(id: string): Promise<void> {
    await this.entityModel.findByIdAndDelete(id).exec();
  }
}
