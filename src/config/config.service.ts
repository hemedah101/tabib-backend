import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiConfigService {
  constructor(private configService: ConfigService) {}

  /**
   * Express app port
   */
  get port(): string {
    return this.configService.get<string>('express.port');
  }
}
