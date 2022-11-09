import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { UserModel } from 'src/user/user.model';

export interface IPostModel {
  uuid: string;
  title: string;
  image: string;
}

@Table({ tableName: 'posts' })
export class PostModel extends Model<PostModel, IPostModel> {
  @Column({ type: DataType.UUID, primaryKey: true, unique: true })
  uuid: string;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => UserModel)
  userId: string;

  @BelongsTo(() => UserModel)
  author: UserModel;
}
