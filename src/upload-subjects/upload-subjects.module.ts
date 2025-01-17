import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadSubject } from './upload-subjects.entity';
import { UploadSubjectService } from './upload-subjects.service';
import { UploadSubjectController } from './upload-subjects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UploadSubject])],
  controllers: [UploadSubjectController],
  providers: [UploadSubjectService],
  exports: [UploadSubjectService],
})
export class UploadSubjectModule {}
