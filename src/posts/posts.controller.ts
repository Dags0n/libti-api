import { Controller, Get, Post as PostRequest, Body, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(): Promise<Post[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Post> {
    return this.postsService.findOne(id);
  }

  @PostRequest()
  create(@Body() postData: Partial<Post>): Promise<Post> {
    return this.postsService.create(postData);
  }
}
