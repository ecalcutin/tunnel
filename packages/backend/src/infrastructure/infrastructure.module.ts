import { Module } from '@nestjs/common';

import { MongoDBModule } from './database/mongodb/mongodb.module';

@Module({
  imports: [MongoDBModule],
  exports: [MongoDBModule],
})
export class InfrastructureModule {}
