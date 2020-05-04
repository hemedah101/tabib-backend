import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { AuthService } from './auth.service';

@Module({
  imports: [ConfigModule.Deferred],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
