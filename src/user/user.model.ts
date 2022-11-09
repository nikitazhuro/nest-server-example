import {
  Table,
  Column,
  DataType,
  Model,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { PermsModel } from 'src/perms/perms.model';
import { PostModel } from 'src/post/post.model';
import { UserPermsModel } from './user-perms.model';

export interface IUser {
  uuid: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, IUser> {
  @Column({ primaryKey: true, type: DataType.UUID })
  uuid: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @BelongsToMany(() => PermsModel, () => UserPermsModel)
  perms: PermsModel[];

  @HasMany(() => PostModel)
  posts: PostModel[];
}
