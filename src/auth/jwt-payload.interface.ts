import { ReviewStatus } from 'src/user/enums/review.enum';

export interface JWTPayload {
  userId: string;
  verified?: boolean;
  review?: ReviewStatus;
  tokenVersion?: number;
}
