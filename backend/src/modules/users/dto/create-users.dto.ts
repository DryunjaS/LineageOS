import { IsString, MinLength } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  login: string;

  @MinLength(6, { message: 'Пароль меньше 6 символов' })
  password: string;
}
