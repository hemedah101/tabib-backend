import { registerAs } from '@nestjs/config';

export default registerAs('metadata', () => ({
  pageSize: parseInt(process.env.PAGE_SIZE),
}));
