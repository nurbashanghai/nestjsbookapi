import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookEntity } from '../book/book.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(type => BookEntity, book => book.user)
  books: BookEntity[];
}
