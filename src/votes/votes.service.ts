import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './vote.entity';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private votesRepository: Repository<Vote>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async vote(postId: string, userId: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }

    const existingVote = await this.votesRepository.findOne({
      where: { post: { id: postId }, userId },
    });

    if (existingVote) {
      throw new HttpException('Você já votou neste post', HttpStatus.BAD_REQUEST);
    }

    const vote = this.votesRepository.create({
      post,
      userId,
    });

    await this.votesRepository.save(vote);

    post.votes += 1;
    return this.postsRepository.save(post);
  }

  async removeVote(postId: string, userId: string): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new HttpException('Post não encontrado', HttpStatus.NOT_FOUND);
    }

    const existingVote = await this.votesRepository.findOne({
      where: { post: { id: postId }, userId },
    });

    if (!existingVote) {
      throw new HttpException('Você ainda não votou neste post', HttpStatus.BAD_REQUEST);
    }

    await this.votesRepository.remove(existingVote);

    post.votes -= 1;
    return this.postsRepository.save(post);
  }
}
