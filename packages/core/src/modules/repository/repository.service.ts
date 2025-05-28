import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryService<Data extends Record<string, unknown>> {
  protected storage = {} as Data;

  async update(data: Data): Promise<void> {
    this.storage = data;
  }

  async read(): Promise<Data> {
    return this.storage;
  }
}
