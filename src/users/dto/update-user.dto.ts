import { PartialType } from '@nestjs/mapped-types';
import { LoginUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(LoginUserDto) {}
