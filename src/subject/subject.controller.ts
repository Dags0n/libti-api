import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { Subject } from './subject.entity';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  // Criar um novo Subject
  @Post()
  async create(@Body() subject: Subject): Promise<Subject> {
    return this.subjectService.create(subject);
  }

  // Obter todos os Subjects
  @Get()
  async findAll(): Promise<Subject[]> {
    return this.subjectService.findAll();
  }

  @Get('search/:name')
  async search(@Param('name') name: string): Promise<Subject[]> {
    return this.subjectService.searchSubjects(name);
  }

  // Obter um Subject por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Subject> {
    return this.subjectService.findOne(id);
  }

  // Atualizar um Subject
  @Put(':id')
  async update(@Param('id') id: string, @Body() subject: Subject): Promise<Subject> {
    return this.subjectService.update(id, subject);
  }

  // Deletar um Subject
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.subjectService.remove(id);
  }
}
