import { registerEnumType } from '@nestjs/graphql';

export enum RolesEnum {
  DEVELOPER = 'DEVELOPER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  DOCTOR = 'DOCTOR',
  USER = 'USER',
}

registerEnumType(RolesEnum, { name: 'RolesEnum' });
