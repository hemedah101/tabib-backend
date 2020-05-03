import { registerAs } from '@nestjs/config';

export default registerAs('express', () => ({
  host: process.env.EXPRESS_HOST,
  port: parseInt(process.env.EXPRESS_PORT, 10) || 4000,
}));
