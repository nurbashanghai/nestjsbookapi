import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UserDto } from 'src/users/users.dto';
import { UserEntity } from 'src/users/users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<UserEntity> {
    return this.usersService.createUser(userDto);
  }
}
