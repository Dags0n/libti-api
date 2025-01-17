import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UploadBookService } from './upload-books.service';
import { UploadBook } from './upload-books.entity';

@Controller('upload-books')
export class UploadBookController {
  constructor(private readonly uploadBookService: UploadBookService) {}

  @Get()
  async findAll(): Promise<UploadBook[]> {
    return this.uploadBookService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UploadBook> {
    return this.uploadBookService.findOne(id);
  }

  @Post()
  async create(@Body() upload: Partial<UploadBook>): Promise<UploadBook> {
    return this.uploadBookService.create(upload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.uploadBookService.remove(id);
  }
}
