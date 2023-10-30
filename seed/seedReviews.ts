import { EntityManager } from "typeorm";
import * as faker from 'faker'

import { BookEntity } from "../src/book/book.entity";
import { ReviewEntity } from "../src/review/review.entity";

const seedReviews = async (manager: EntityManager, books: BookEntity[], NUM_REVIEWS: number, NUM_BOOKS: number) => {
  const reviews: Array<Partial<ReviewEntity>> = [];
  for (let i = 1; i <= NUM_REVIEWS; i++) {
    const review: Partial<ReviewEntity> = {
      title: faker.lorem.words(3),
      body: faker.lorem.paragraph(5),
      reviewDate: faker.date.past(),
      rating: faker.random.number({ min: 0, max: 10 }),
      reviewerName: faker.name.firstName() + ' ' + faker.name.lastName(),
      book: books[i % NUM_BOOKS]
    };
    reviews.push(review)
  }

  await manager
    .createQueryBuilder()
    .insert()
    .into(ReviewEntity)
    .values(reviews)
    .execute()
}

export default seedReviews
