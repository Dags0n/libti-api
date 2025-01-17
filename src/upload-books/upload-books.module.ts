import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadBook } from './upload-books.entity';
import { UploadBookService } from './upload-books.service';
import { UploadBookController } from './upload-books.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UploadBook])],
  controllers: [UploadBookController],
  providers: [UploadBookService],
  exports: [UploadBookService],
})
export class UploadBookModule {}
