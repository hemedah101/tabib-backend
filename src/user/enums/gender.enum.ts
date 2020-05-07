import { registerEnumType } from '@nestjs/graphql';

export enum GenderEnum {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

registerEnumType(GenderEnum, { name: 'GenderEnum' });
