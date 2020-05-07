import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OgmaSkip } from '@ogma/nestjs-module';
import { ConfigService } from 'src/config/config.service';
import { LoginVm } from 'src/user/view-models/login-vm.model';
import { GoogleGuard } from './guards';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(readonly configService: ConfigService) {}

  @UseGuards(AuthGuard('google'))
  @Get('google/login')
  async googleLogin(): Promise<void> {
    return;
  }

  @OgmaSkip()
  @UseGuards(GoogleGuard)
  @Get('google/callback')
  async googleCallback(@Req() req: any): Promise<LoginVm> {
    const user = req.user;
    return new LoginVm({ ...user });
  }
}
