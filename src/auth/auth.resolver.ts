import { Resolver } from '@nestjs/graphql';
import { UserService } from 'src/user/user.service';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly userService: UserService) {}
}
