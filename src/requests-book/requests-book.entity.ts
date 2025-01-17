import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { UploadBook } from '../upload-books/upload-books.entity';

@Entity()
export class RequestsBook {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UploadBook, (uploadBook) => uploadBook.id, { eager: true })
  uploadBook: UploadBook;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  requester: User;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
