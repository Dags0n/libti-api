import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestsBook } from './requests-book.entity';

@Injectable()
export class RequestsBookService {
  constructor(
    @InjectRepository(RequestsBook)
    private readonly requestsBookRepository: Repository<RequestsBook>,
  ) {}

  async findAll(): Promise<RequestsBook[]> {
    return this.requestsBookRepository.find();
  }

  async findOne(id: string): Promise<RequestsBook> {
    const request = await this.requestsBookRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`RequestsBook with ID ${id} not found`);
    }
    return request;
  }

  async create(request: Partial<RequestsBook>): Promise<RequestsBook> {
    const newRequest = this.requestsBookRepository.create(request);
    return this.requestsBookRepository.save(newRequest);
  }

  async updateStatus(id: string, status: 'pending' | 'accepted' | 'rejected'): Promise<RequestsBook> {
    const request = await this.findOne(id);
    request.status = status;
    return this.requestsBookRepository.save(request);
  }
}
