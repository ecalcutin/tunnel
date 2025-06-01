import { Module } from '@nestjs/common';

import { IPAllocatorService } from './ip-allocator.service';

@Module({
  providers: [IPAllocatorService],
  exports: [IPAllocatorService],
})
export class IPAllocatorModule {}
