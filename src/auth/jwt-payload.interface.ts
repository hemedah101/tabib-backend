import { GenderEnum } from 'src/user/enums/gender.enum';
import { ReviewStatus } from 'src/user/enums/review.enum';
import { RolesEnum } from 'src/user/enums/roles.enum';

export interface JWTPayload {
  userId: string;
  verified: boolean;
  review: ReviewStatus;
  role: RolesEnum;
  gender?: GenderEnum;
}
