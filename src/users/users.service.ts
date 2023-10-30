import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './users.entity';
import { UserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) { }

  async createUser(userDto: UserDto): Promise<UserEntity> {
    const { username, password } = userDto;

    const existingUser = await this.userRepository.findOne({ where: { username } });

    if (existingUser) {
      throw new Error('Username already in use');
    }

    const newUser = this.userRepository.create({
      username,
      password,
    });

    return this.userRepository.save(newUser);
  }
}
