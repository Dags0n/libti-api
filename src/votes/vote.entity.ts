import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Post } from 'src/posts/post.entity';

@Entity()
export class Vote {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => Post, post => post.votes)
  post: Post;
}
