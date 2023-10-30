import { EntityManager } from "typeorm";
import * as faker from 'faker'

import { AuthorEntity } from "../src/author/author.entity";
import { BookEntity } from "../src/book/book.entity";
import { PublisherEntity } from "../src/publisher/publisher.entity";


const seedBooks = async (
  manager: EntityManager,
  authors: AuthorEntity[],
  publishers: PublisherEntity[],
  NUM_BOOKS: number,
  NUM_AUTHORS: number,
  NUM_PUBLISHERS: number
) => {
  const books: Array<Partial<BookEntity>> = [];
  for (let i = 1; i <= NUM_BOOKS; i++) {
    const book: Partial<BookEntity> = {
      title: faker.lorem.words(3),
      summary: faker.lorem.paragraph(2),
      publishedDate: faker.date.past(),
      author: authors[i % NUM_AUTHORS],
      isPublished: faker.random.number(10) < 2,
      publisher: publishers[i % NUM_PUBLISHERS]
    };
    books.push(book)
  }

  await manager
    .createQueryBuilder()
    .insert()
    .into(BookEntity)
    .values(books)
    .execute()
  return await manager.getRepository(BookEntity).find()
}

export default seedBooks
