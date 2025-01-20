import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { Post } from 'src/posts/post.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  // Criar um novo comentário
  async create(postId: string, commentData: Partial<Comment>): Promise<Comment> {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new Error('Post não encontrado');
    }

    const comment = this.commentsRepository.create({
      ...commentData,
      post,
    });

    return this.commentsRepository.save(comment);
  }

  // Listar todos os comentários de um post específico
  async findAll(postId: string): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { post: { id: postId } },
    });
  }
}
