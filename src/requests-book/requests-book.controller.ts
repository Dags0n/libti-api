import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RequestsBookService } from './requests-book.service';
import { RequestsBook } from './requests-book.entity';

@Controller('requests-books')
export class RequestsBookController {
  constructor(private readonly requestsBookService: RequestsBookService) {}

  @Get()
  async findAll(): Promise<RequestsBook[]> {
    return this.requestsBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RequestsBook> {
    return this.requestsBookService.findOne(id);
  }

  @Post()
  async create(@Body() request: Partial<RequestsBook>): Promise<RequestsBook> {
    return this.requestsBookService.create(request);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'accepted' | 'rejected',
  ): Promise<RequestsBook> {
    return this.requestsBookService.updateStatus(id, status);
  }
}
