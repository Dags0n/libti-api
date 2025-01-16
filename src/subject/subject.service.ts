import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
  ) {}

  // Criar um novo Subject
  async create(subject: Partial<Subject>): Promise<Subject> {
    const newSubject = this.subjectRepository.create(subject);
    return await this.subjectRepository.save(newSubject);
  }

  // Obter todos os Subjects
  async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find();
  }

  async searchSubjects(name: string): Promise<Subject[]> {
    return await this.subjectRepository.find({
      where: { name: ILike(`%${name}%`) },
    });
  }

  // Obter um Subject pelo ID
  async findOne(id: string): Promise<Subject> {
    return await this.subjectRepository.findOneBy({ id });
  }

  // Atualizar um Subject
  async update(id: string, subject: Partial<Subject>): Promise<Subject> {
    await this.subjectRepository.update(id, subject);
    return this.findOne(id);
  }

  // Deletar um Subject
  async remove(id: string): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
