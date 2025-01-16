import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Método para criar um novo livro
  async createBook(createBookDto: {
    title: string;
    author?: string;
    edition?: string;
    publisher?: string;
    isbn?: string;
    yearPublication?: string;
    link: string;
    cover: Buffer;
  }): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  // Método para listar todos os livros
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async searchBooks(title: string): Promise<Book[]> {
    return this.bookRepository.find({
      where: { title: ILike(`%${title}%`) },
    });
  }  

  // Método para buscar um livro pelo ID
  async findOne(id: string): Promise<Book> {
    return this.bookRepository.findOne({ where: { id } });
  }

  // Método para atualizar um livro
  async updateBook(id: string, updateBookDto: Partial<Book>): Promise<Book> {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOne({ where: { id } });
  }

  // Método para excluir um livro
  async removeBook(id: string): Promise<void> {
    await this.bookRepository.delete(id);
  }
}
