import { Module } from '@nestjs/common';

import { SimpleRepositoryService } from './simple-repository.service';

@Module({
  providers: [SimpleRepositoryService],
  exports: [SimpleRepositoryService],
})
export class RepositoryModule {}
