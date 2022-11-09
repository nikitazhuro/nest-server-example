import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { FileModule } from 'src/files/file.module';
import { UserModel } from 'src/user/user.model';

import { PostController } from './post.controller';
import { PostModel } from './post.model';
import { PostService } from './post.service';

@Module({
  imports: [
    SequelizeModule.forFeature([PostModel, UserModel]),
    FileModule,
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
