import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsSubject } from './requests-subject.entity';
import { RequestsSubjectService } from './requests-subject.service';
import { RequestsSubjectController } from './requests-subject.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestsSubject])],
  controllers: [RequestsSubjectController],
  providers: [RequestsSubjectService],
})
export class RequestsSubjectModule {}
