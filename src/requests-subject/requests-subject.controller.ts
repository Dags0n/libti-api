import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { RequestsSubjectService } from './requests-subject.service';
import { RequestsSubject } from './requests-subject.entity';

@Controller('requests-subjects')
export class RequestsSubjectController {
  constructor(private readonly requestsSubjectService: RequestsSubjectService) {}

  @Get()
  async findAll(): Promise<RequestsSubject[]> {
    return this.requestsSubjectService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<RequestsSubject> {
    return this.requestsSubjectService.findOne(id);
  }

  @Post()
  async create(@Body() request: Partial<RequestsSubject>): Promise<RequestsSubject> {
    return this.requestsSubjectService.create(request);
  }

  @Put(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'pending' | 'accepted' | 'rejected',
  ): Promise<RequestsSubject> {
    return this.requestsSubjectService.updateStatus(id, status);
  }
}
