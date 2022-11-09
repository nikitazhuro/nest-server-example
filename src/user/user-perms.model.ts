import {
  Table,
  Column,
  DataType,
  Model,
  ForeignKey,
} from 'sequelize-typescript';

import { PermsModel } from 'src/perms/perms.model';
import { UserModel } from './user.model';

export interface IUser {
  uuid: string;
  email: string;
  password: string;
}

@Table({ tableName: 'user-perms', createdAt: false, updatedAt: false })
export class UserPermsModel extends Model<UserPermsModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.STRING })
  userUUID: string;

  @ForeignKey(() => PermsModel)
  @Column({ type: DataType.STRING })
  permUUID: string;
}
