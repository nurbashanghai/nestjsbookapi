import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from 'src/author/author.entity';

@Controller('authors')
export class AuthorsController {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) { }

  @Get()
  async findAll(): Promise<AuthorEntity[]> {
    return this.authorRepository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AuthorEntity> {
    return this.authorRepository.findOne(id);
  }

  @Post()
  async create(@Body() authorData: AuthorEntity): Promise<AuthorEntity> {
    const author = this.authorRepository.create(authorData);
    return this.authorRepository.save(author);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() authorData: AuthorEntity): Promise<AuthorEntity> {
    await this.authorRepository.update(id, authorData);
    return this.authorRepository.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.authorRepository.delete(id);
  }

  @Get('search')
  async search(
    @Query('email') email: string,
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string
  ): Promise<AuthorEntity[]> {
    const query = {};

    if (email) {
      query['email'] = Like(`%${email}%`);
    }

    if (firstName) {
      query['firstName'] = Like(`%${firstName}%`);
    }

    if (lastName) {
      query['lastName'] = Like(`%${lastName}%`);
    }

    return this.authorRepository.find({
      where: query,
    });
  }
}
