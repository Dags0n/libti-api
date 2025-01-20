import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { Post } from 'src/posts/post.entity';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Post])],
  providers: [VotesService],
  controllers: [VotesController],
  exports: [VotesService],
})
export class VotesModule {}
