import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPermsModel } from 'src/user/user-perms.model';
import { UserModel } from 'src/user/user.model';
import { PermsController } from './perms.controller';
import { PermsModel } from './perms.model';
import { PermsService } from './perms.service';

@Module({
  imports: [
    SequelizeModule.forFeature([PermsModel, UserModel, UserPermsModel]),
  ],
  controllers: [PermsController],
  providers: [PermsService],
  exports: [PermsService],
})
export class PermsModule {}
