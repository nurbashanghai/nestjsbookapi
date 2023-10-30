import { Module } from '@nestjs/common'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { UserEntity } from './users.entity'
import { UsersService } from './users.service';

@Module({
  imports: [
    NestjsQueryTypeOrmModule.forFeature([UserEntity])
  ],
  providers: [UsersService]
})
export class UsersModule { }