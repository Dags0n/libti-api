import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UploadSubject } from './upload-subjects.entity';

@Injectable()
export class UploadSubjectService {
  constructor(
    @InjectRepository(UploadSubject)
    private readonly uploadSubjectRepository: Repository<UploadSubject>,
  ) {}

  async findAll(): Promise<UploadSubject[]> {
    return this.uploadSubjectRepository.find();
  }

  async findOne(id: string): Promise<UploadSubject> {
    const upload = await this.uploadSubjectRepository.findOne({ where: { id } });
    if (!upload) {
      throw new NotFoundException(`UploadSubject with ID ${id} not found`);
    }
    return upload;
  }

  async create(upload: Partial<UploadSubject>): Promise<UploadSubject> {
    const newUpload = this.uploadSubjectRepository.create(upload);
    return this.uploadSubjectRepository.save(newUpload);
  }

  async remove(id: string): Promise<void> {
    const upload = await this.findOne(id);
    await this.uploadSubjectRepository.remove(upload);
  }
}
