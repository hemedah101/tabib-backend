// import { ApiProperty } from '@nestjs/swagger';
// import { DocumentType } from '@typegoose/typegoose';
// import { Transform } from 'class-transformer';
// import { BaseModelVm } from 'src/core/models';
// import { User } from '../models/user.model';
// import { UserVm } from './user-vm.model';

// export class LoginVm extends BaseModelVm {
//   @ApiProperty({ type: String })
//   token: string;

//   @ApiProperty({ type: UserVm })
//   @Transform((val: DocumentType<User>) => new UserVm(val))
//   user: UserVm;
// }
