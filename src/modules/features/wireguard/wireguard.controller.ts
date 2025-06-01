import {
  Controller,
  Get,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { WireguardService } from './wireguard.service';

@Controller('/wireguard')
export class WireguardController {
  constructor(
    @Inject(WireguardService)
    private readonly wireguardService: WireguardService,
  ) {}

  @Get('/keypair')
  async generateKeyPair() {
    return this.wireguardService.generateKeyPair();
  }

  @Get('/config')
  async readConfig() {
    return this.wireguardService.readConfig();
  }

  @Post('/config')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the field name in the form-data
  async writeConfig(@UploadedFile() file: Express.Multer.File) {
    const config = file.buffer.toString();
    return this.wireguardService.apply(config);
  }
}
