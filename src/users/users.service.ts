import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/types';
import { Users } from 'src/drizzle/schema/users.schema';
import { and, eq } from 'drizzle-orm';
@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}
  async login(loginUserDto: LoginUserDto) {
    const [user] = await this.db
      .select()
      .from(Users)
      .where(
        and(
          eq(Users.correo, loginUserDto.correo),
          eq(Users.contrasena, loginUserDto.contrasena),
        ),
      );
    if (!user) throw new NotFoundException('Credenciales incorrectas');

    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const [user] = await this.db
      .insert(Users)
      .values(createUserDto)
      .$returningId();

    if (!user) {
      throw new BadRequestException('Error al crear el usuario');
    }
    return createUserDto;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
}
