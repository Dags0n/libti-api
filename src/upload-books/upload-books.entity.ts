import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('upload_books')
export class UploadBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  author: string;

  @Column({ nullable: true })
  edition: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ nullable: true })
  yearPublication: string;

  @Column()
  link: string;

  @Column('bytea', { nullable: true })
  cover: Buffer;

  @ManyToOne(() => User, (user) => user.uploadsBook, { eager: true })
  user: User;
}
