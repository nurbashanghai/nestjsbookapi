import { EntityManager } from "typeorm";
import * as faker from 'faker'

import { PublisherEntity } from "../src/publisher/publisher.entity";

const seedPublishers = async (manager: EntityManager, NUM_PUBLISHERS: number) => {
  const publishers: Array<Partial<PublisherEntity>> = [];
  for (let i = 0; i < NUM_PUBLISHERS; i++) {
    const publisher: Partial<PublisherEntity> = {
      name: faker.company.companyName(),
      address: faker.address.streetAddress(true)
    };
    publishers.push(publisher)
  }
  await manager
    .createQueryBuilder()
    .insert()
    .into(PublisherEntity)
    .values(publishers)
    .execute()
  return await manager.getRepository(PublisherEntity).find()
}

export default seedPublishers
