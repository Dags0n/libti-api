import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/book.entity';
import { BookModule } from './book/book.module';
import { Subject } from './subject/subject.entity';
import { SubjectModule } from './subject/subject.module';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadBook } from './upload-books/upload-books.entity';
import { UploadBookModule } from './upload-books/upload-books.module';
import { UploadSubject } from './upload-subjects/upload-subjects.entity';
import { UploadSubjectModule } from './upload-subjects/upload-subjects.module';
import { RequestsSubject } from './requests-subject/requests-subject.entity';
import { RequestsSubjectModule } from './requests-subject/requests-subject.module';
import { RequestsBook } from './requests-book/requests-book.entity';
import { RequestsBookModule } from './requests-book/requests-book.module';
import { EmailModule } from './email/email.module';
import { Post } from './posts/post.entity';
import { PostsModule } from './posts/posts.module';
import { Comment } from './comments/comment.entity';
import { CommentsModule } from './comments/comments.module';
import { Vote } from './votes/vote.entity';
import { VotesModule } from './votes/votes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Book, Subject, User, UploadBook, UploadSubject, RequestsSubject, RequestsBook, Post, Comment, Vote],
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE', false),
      }),
    }),
    BookModule,
    SubjectModule,
    UserModule,
    AuthModule,
    UploadBookModule,
    UploadSubjectModule,
    RequestsSubjectModule,
    RequestsBookModule,
    EmailModule,
    PostsModule,
    CommentsModule,
    VotesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
