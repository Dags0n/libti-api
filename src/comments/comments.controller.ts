import { Controller, Get, Post as PostRequest, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  // Listar todos os comentários de um post
  @Get()
  findAll(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentsService.findAll(postId);
  }

  // Criar um novo comentário
  @PostRequest()
  create(
    @Param('postId') postId: string,
    @Body() commentData: Partial<Comment>,
  ): Promise<Comment> {
    return this.commentsService.create(postId, commentData);
  }
}
