import { Controller, Post as PostRequest, Delete, Param, Body } from '@nestjs/common';
import { VotesService } from './votes.service';
import { Post } from 'src/posts/post.entity';

@Controller('posts/:postId/votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  // Votar em um post
  @PostRequest()
  vote(
    @Param('postId') postId: string,
    @Body('userId') userId: string,
  ): Promise<Post> {
    return this.votesService.vote(postId, userId);
  }

  // Remover o voto de um post
  @Delete(':userId')
  removeVote(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ): Promise<Post> {
    return this.votesService.removeVote(postId, userId);
  }
}
