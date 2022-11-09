import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';

import { UserModel } from './user/user.model';
import { UserModule } from './user/user.module';
import { PermsModule } from './perms/perms.module';
import { PermsModel } from './perms/perms.model';
import { UserPermsModel } from './user/user-perms.model';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PostModel } from './post/post.model';
import { FileModule } from './files/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'nest-test',
      models: [UserModel, PermsModel, UserPermsModel, PostModel],
      autoLoadModels: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),
    UserModule,
    PermsModule,
    AuthModule,
    PostModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
