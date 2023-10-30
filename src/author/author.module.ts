import { Module } from '@nestjs/common'
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm'
import { AuthorEntity } from './author.entity'
import { AuthorResolver } from './author.resolver'

@Module({
  providers: [AuthorResolver],
  imports: [
    NestjsQueryTypeOrmModule.forFeature([AuthorEntity])
  ]
})
export class AuthorModule { }