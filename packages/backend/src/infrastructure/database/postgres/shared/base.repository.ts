import { Kysely } from 'kysely';

import { BaseRepositoryPort } from 'core/shared';

import { Database } from './database.interface';

export abstract class BaseRepository<DomainEntity>
  implements BaseRepositoryPort<DomainEntity>
{
  constructor(
    protected readonly db: Kysely<Database>,
    protected readonly tableName: keyof Database,
  ) {}

  async create(entity: DomainEntity): Promise<DomainEntity> {
    const result = await this.db
      .insertInto(this.tableName)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .values(entity)
      .executeTakeFirst();
    return result as DomainEntity;
  }
  async find(): Promise<DomainEntity[]> {
    const entities = await this.db
      .selectFrom(this.tableName)
      .selectAll()
      .execute();
    return entities as DomainEntity[];
  }
  async getById(id: string): Promise<DomainEntity> {
    void id;
    throw new Error('Not implemented');
  }
  async deleteById(id: string): Promise<DomainEntity> {
    void id;
    throw new Error('Not implemented');
  }
}
