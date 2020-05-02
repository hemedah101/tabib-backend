import { Controller, Get } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  readiness() {
    return this.health.check([
      async () => this.dns.pingCheck('google', 'https://google.com'),
    ]);
  }
}
