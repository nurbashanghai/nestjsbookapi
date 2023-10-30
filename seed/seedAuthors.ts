import { EntityManager } from "typeorm"
import * as faker from 'faker'

import { AuthorEntity } from "../src/author/author.entity"

const seedAuthors = async (manager: EntityManager, NUM_AUTHORS: number) => {
  const authors: Array<Partial<AuthorEntity>> = []
  for (let i = 0; i < NUM_AUTHORS; i++) {
    const author: Partial<AuthorEntity> = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
    }
    authors.push(author)
  }
  await manager
    .createQueryBuilder()
    .insert()
    .into(AuthorEntity)
    .values(authors)
    .execute()

  return await manager.getRepository(AuthorEntity).find()
}

export default seedAuthors