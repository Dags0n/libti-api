import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsBook } from './requests-book.entity';
import { RequestsBookService } from './requests-book.service';
import { RequestsBookController } from './requests-book.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RequestsBook])],
  controllers: [RequestsBookController],
  providers: [RequestsBookService],
})
export class RequestsBookModule {}
