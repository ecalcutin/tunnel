import { Injectable } from '@nestjs/common';

import { RepositoryService } from './repository.service';

@Injectable()
export class SimpleRepositoryService<Data> extends RepositoryService<Data> {
  private readonly storage: Record<string, unknown>;

  constructor(private readonly storageKey: string) {
    super();
    this.storage = {};
  }

  async update(data: unknown): Promise<void> {
    this.storage[this.storageKey] = data;
  }

  async read(): Promise<Data> {
    return this.storage[this.storageKey] as Data;
  }
}
