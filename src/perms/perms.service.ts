import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 } from 'uuid';

import { CreatePermDto } from './dto/createPerm.dto';
import { PermsModel } from './perms.model';

@Injectable()
export class PermsService {
  constructor(
    @InjectModel(PermsModel) private permsRepository: typeof PermsModel,
  ) {}

  async createPerm(permDto: CreatePermDto) {
    const createPermData = {
      ...permDto,
      uuid: v4(),
    };

    const perm = await this.permsRepository.create(createPermData);
    return perm;
  }

  async getPerm(value: string) {
    const perm = await this.permsRepository.findOne({
      where: {
        value,
      },
    });
    return perm;
  }
}
