import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserPermsModel } from 'src/user/user-perms.model';
import { UserModel } from 'src/user/user.model';

interface IPerms {
  value: string;
  description: string;
}

@Table({ tableName: 'perms' })
export class PermsModel extends Model<PermsModel, IPerms> {
  @Column({ type: DataType.UUID, unique: true, primaryKey: true })
  uuid: string;

  @Column({ type: DataType.STRING, unique: true })
  value: string;

  @Column({ type: DataType.STRING })
  description: string;

  @BelongsToMany(() => UserModel, () => UserPermsModel)
  users: UserModel[];
}
