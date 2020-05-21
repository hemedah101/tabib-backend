import { registerEnumType } from '@nestjs/graphql';

export enum RelationshipEnum {
  SINGLE = 'SINGLE',
  ENGAGED = 'ENGAGED',
  MARRIED = 'MARRIED',
  DIVORCED = 'DIVORCED',
  WIDOWED = 'WIDOWED',
}

registerEnumType(RelationshipEnum, { name: 'RelationshipEnum' });
