import * as bcrypt from 'bcryptjs';

export const generateHashedPassword = async (password: string) => {
  return await bcrypt.hash(password, await bcrypt.genSalt(8));
};

export const validPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
