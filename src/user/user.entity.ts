import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UploadBook } from '../upload-books/upload-books.entity';
import { UploadSubject } from '../upload-subjects/upload-subjects.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('bytea', { nullable: true })
  profilePicture: Buffer | null;

  @OneToMany(() => UploadBook, (upload) => upload.user)
  uploadsBook: UploadBook[];

  @OneToMany(() => UploadSubject, (upload) => upload.user)
  uploadsSubject: UploadSubject[];
}
