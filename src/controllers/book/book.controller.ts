import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/book.dto';
import { AuthMiddleware } from 'src/middleware/auth.middleware';

@Controller('books')
export class BooksController {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }

  @Get()
  @UseGuards(AuthMiddleware)
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  @Get(':id')
  @UseGuards(AuthMiddleware)
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  @Post()
  @UseGuards(AuthMiddleware)
  async create(@Body() bookData: Book): Promise<Book> {
    const book = this.bookRepository.create(bookData);
    return this.bookRepository.save(book);
  }

  @Delete(':id')
  @UseGuards(AuthMiddleware)
  async remove(@Param('id') id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }

  @Get('search')
  @UseGuards(AuthMiddleware)
  async search(
    @Query('title') title: string,
  ): Promise<Book[]> {
    const query = {};

    if (title) {
      query['title'] = Like(`%${title}%`);
    }

    return this.bookRepository.find({
      where: query,
    });
  }
}
