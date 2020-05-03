import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  access: process.env.ACCESS_TOKEN_SECRET,
  refresh: process.env.REFRESH_TOKEN_SECRET,
  expireIn: parseInt(process.env.EXPIRE_IN),
}));
