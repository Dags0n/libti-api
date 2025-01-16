import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Rota para criar um novo livro
  @Post()
  async create(@Body() createBookDto: {
    title: string;
    author?: string;
    edition?: string;
    publisher?: string;
    isbn?: string;
    yearPublication?: string;
    link: string;
    cover: Buffer;
  }): Promise<Book> {
    return this.bookService.createBook(createBookDto);
  }

  // Rota para obter todos os livros
  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Get('search/:title')
  async search(@Param('title') title: string): Promise<Book[]> {
    return this.bookService.searchBooks(title);
  }

  // Rota para obter um livro pelo ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  // Rota para atualizar um livro
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: Partial<Book>): Promise<Book> {
    return this.bookService.updateBook(id, updateBookDto);
  }

  // Rota para deletar um livro
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.bookService.removeBook(id);
  }
}
