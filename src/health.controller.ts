import { Controller, Get, UnauthorizedException } from '@nestjs/common';
import {
  DNSHealthIndicator,
  HealthCheck,
  HealthCheckService,
} from '@nestjs/terminus';

@Controller()
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly dns: DNSHealthIndicator,
  ) {}

  @Get('health')
  @HealthCheck()
  readiness() {
    return this.health.check([
      async () => this.dns.pingCheck('google', 'https://google.com'),
    ]);
  }

  @Get('')
  home() {
    throw new UnauthorizedException();
  }
}
