import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('books')  // Nome da tabela no banco de dados
export class Book {
  @PrimaryGeneratedColumn('uuid')  // Gerar um UUID para o campo id
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

  @Column('bytea')
  cover: Buffer;
}
