import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-user')
  @UsePipes(new ValidationPipe())
  async createUser(@Body() CreateUsersDto: CreateUsersDto) {
    return this.usersService.create(CreateUsersDto);
  }
}
