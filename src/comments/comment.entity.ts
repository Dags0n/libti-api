import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from 'src/posts/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  text: string;

  @ManyToOne(() => Post, post => post.comments)
  post: Post;
}
