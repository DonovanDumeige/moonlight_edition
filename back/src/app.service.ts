import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './assets/dto';
import { User } from './assets/entities';
import * as argon from 'argon2';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private dbUser: Repository<User>,
  ) {}

  async register(dto: CreateUserDto) {
    let passError, emailError;
    const email = this.dbUser.findOneBy({ email: dto.email });
    if (dto.password !== dto.passBis) passError = 'No matching passwords.';
    if (email) emailError = 'Email already use.';

    const hash = await argon.hash(dto.password);
    const user = this.dbUser.create({ ...dto, password: hash });
    await this.dbUser.save(user);

    if (passError || emailError) {
      const errors = {
        status: HttpStatus.CONFLICT,
        message: {
          1: passError,
          2: emailError,
        },
      };
      return errors;
    } else {
      const notif = 'Account created !';
      return {
        notif,
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    }
  }

  login(dto) {
    return 'it should log the user';
  }
}
