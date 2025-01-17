import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestsSubject } from './requests-subject.entity';

@Injectable()
export class RequestsSubjectService {
  constructor(
    @InjectRepository(RequestsSubject)
    private readonly requestsSubjectRepository: Repository<RequestsSubject>,
  ) {}

  async findAll(): Promise<RequestsSubject[]> {
    return this.requestsSubjectRepository.find();
  }

  async findOne(id: string): Promise<RequestsSubject> {
    const request = await this.requestsSubjectRepository.findOne({ where: { id } });
    if (!request) {
      throw new NotFoundException(`RequestsSubject with ID ${id} not found`);
    }
    return request;
  }

  async create(request: Partial<RequestsSubject>): Promise<RequestsSubject> {
    const newRequest = this.requestsSubjectRepository.create(request);
    return this.requestsSubjectRepository.save(newRequest);
  }

  async updateStatus(id: string, status: 'pending' | 'accepted' | 'rejected'): Promise<RequestsSubject> {
    const request = await this.findOne(id);
    request.status = status;
    return this.requestsSubjectRepository.save(request);
  }
}
