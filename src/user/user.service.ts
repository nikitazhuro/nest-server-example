import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PermsService } from 'src/perms/perms.service';
import { v4 } from 'uuid';

import { UserCreateDto } from './dto/user-create.dto';
import { UserModel } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel) private userRepository: typeof UserModel,
    private readonly permsService: PermsService,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserModel> {
    const newUserData = {
      uuid: v4(),
      ...userCreateDto,
    };
    const newUser = await this.userRepository.create(newUserData);
    const perm = await this.permsService.getPerm('admin');

    await newUser.$set('perms', [perm.uuid]);

    newUser.perms = [perm];

    return newUser;
  }

  async getUserByEmail(userDto: UserCreateDto) {
    const user = this.userRepository.findOne({
      where: {
        email: userDto.email,
      },
      include: {
        all: true,
      },
    });
    return user;
  }

  async getAllUser() {
    const users = await this.userRepository.findAll({
      include: {
        all: true,
      },
    });
    return users;
  }
}
