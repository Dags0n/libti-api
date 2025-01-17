import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity('upload_subjects')
export class UploadSubject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  teacher: string;

  @Column()
  semester: string;

  @Column()
  fileLink: string;

  @ManyToOne(() => User, (user) => user.uploadsSubject, { eager: true })
  user: User;
}
