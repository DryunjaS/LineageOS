import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entitys/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  async create(createUsersDto: CreateUsersDto) {
    const existUser = await this.usersRepository.findOne({
      where: { login: createUsersDto.login },
    });
    if (existUser) {
      throw new BadRequestException('Такой пользователь уже существует');
    }
    const hashedPassword = await bcrypt.hash(createUsersDto.password, 10);

    const newUser = await this.usersRepository.save({
      login: createUsersDto.login,
      password: hashedPassword,
    });

    return { newUser };
  }
  async findOne(login: string) {
    return await this.usersRepository.findOne({ where: { login } });
  }
}
