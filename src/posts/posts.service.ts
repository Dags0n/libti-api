import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      order: { date: 'DESC' },
    });
  }

  findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne({ where: { id } });
  }

  create(postData: Partial<Post>): Promise<Post> {
    const post = this.postsRepository.create(postData);
    return this.postsRepository.save(post);
  }

  async updateVotes(postId: string, newVotes: number): Promise<Post> {
    const post = await this.findOne(postId);
    post.votes = newVotes;
    return this.postsRepository.save(post);
  }
}
