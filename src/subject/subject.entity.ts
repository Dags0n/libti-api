import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('subject')
export class Subject {
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
}
