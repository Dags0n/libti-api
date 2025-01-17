import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { UploadSubject } from '../upload-subjects/upload-subjects.entity';

@Entity()
export class RequestsSubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UploadSubject, (uploadSubject) => uploadSubject.id, { eager: true })
  uploadSubject: UploadSubject;

  @ManyToOne(() => User, (user) => user.id, { eager: true })
  requester: User;

  @Column({ default: 'pending' })
  status: 'pending' | 'accepted' | 'rejected';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
