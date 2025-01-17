import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadBook } from './upload-books.entity';

@Injectable()
export class UploadBookService {
  constructor(
    @InjectRepository(UploadBook)
    private readonly uploadBookRepository: Repository<UploadBook>,
  ) {}

  async findAll(): Promise<UploadBook[]> {
    return this.uploadBookRepository.find();
  }

  async findOne(id: string): Promise<UploadBook> {
    const upload = await this.uploadBookRepository.findOne({ where: { id } });
    if (!upload) {
      throw new NotFoundException(`UploadBook with ID ${id} not found`);
    }
    return upload;
  }

  async create(upload: Partial<UploadBook>): Promise<UploadBook> {
    const newUpload = this.uploadBookRepository.create(upload);
    return this.uploadBookRepository.save(newUpload);
  }

  async remove(id: string): Promise<void> {
    const upload = await this.findOne(id);
    await this.uploadBookRepository.remove(upload);
  }
}
