import { Module } from '@nestjs/common';

import { MongoDBModule } from './mongodb';

@Module({
  imports: [MongoDBModule],
  exports: [MongoDBModule],
})
export class DatabaseModule {}
