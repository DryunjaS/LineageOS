import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interface/users';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.usersService.findOne(login);

    const isMatch = await bcrypt.compare(password, user.password);

    if (user && isMatch) {
      return user;
    }
    throw new BadRequestException('Пользователь не найден или пароль неверен!');
  }

  async login(user: IUser) {
    const { login } = user;
    return {
      login,
      token: this.jwtService.sign(
        { id: user.id, login: user.login },
        { secret: this.configService.get('jwt_secret') },
      ),
    };
  }
}
