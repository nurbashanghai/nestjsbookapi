import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthorEntity } from './author/author.entity'
import { BookEntity } from './book/book.entity'
import { PublisherEntity } from './publisher/publisher.entity'
import { ReviewEntity } from './review/review.entity'
import { AuthorModule } from './author/author.module'
import { BookModule } from './book/book.module'
import { PublisherModule } from './publisher/publisher.module'
import { ReviewModule } from './review/review.module'
import { BooksController } from './controllers/book/book.controller'
import { AuthorsController } from './controllers/authors/authors.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './datab.sqlite3',
      entities: [
        AuthorEntity,
        BookEntity,
        PublisherEntity,
        ReviewEntity
      ],
      logging: true
    }),
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema/schema.gql'
    }),
    AuthorModule,
    BookModule,
    PublisherModule,
    ReviewModule
  ],
  controllers: [BooksController, AuthorsController]
})
export class AppModule { }
