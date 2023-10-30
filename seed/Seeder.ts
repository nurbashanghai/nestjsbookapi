import { Connection } from 'typeorm'

import seedAuthors from './seedAuthors'
import seedPublishers from './seedPublishers'
import seedBooks from './seedBooks'
import seedReviews from './seedReviews'

export class Seeder {
  private readonly NUM_AUTHORS = 10
  private readonly NUM_PUBLISHERS = 3
  private readonly NUM_BOOKS = 50
  private readonly NUM_REVIEWS = 100

  constructor(private conn: Connection) { }

  async seed() {
    await this.conn.transaction(async entityManager => {
      const authors = await seedAuthors(entityManager, this.NUM_AUTHORS)
      const publishers = await seedPublishers(entityManager, this.NUM_PUBLISHERS)
      const books = await seedBooks(entityManager, authors, publishers, this.NUM_BOOKS, this.NUM_AUTHORS, this.NUM_PUBLISHERS)
      await seedReviews(entityManager, books, this.NUM_REVIEWS, this.NUM_BOOKS)
    })
  }
}
