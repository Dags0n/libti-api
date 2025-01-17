import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UploadSubjectService } from './upload-subjects.service';
import { UploadSubject } from './upload-subjects.entity';

@Controller('upload-subjects')
export class UploadSubjectController {
  constructor(private readonly uploadSubjectService: UploadSubjectService) {}

  @Get()
  async findAll(): Promise<UploadSubject[]> {
    return this.uploadSubjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UploadSubject> {
    return this.uploadSubjectService.findOne(id);
  }

  @Post()
  async create(@Body() upload: Partial<UploadSubject>): Promise<UploadSubject> {
    return this.uploadSubjectService.create(upload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.uploadSubjectService.remove(id);
  }
}
