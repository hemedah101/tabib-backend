import { registerEnumType } from '@nestjs/graphql';

export enum ReviewStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

registerEnumType(ReviewStatus, { name: 'ReviewStatus' });
