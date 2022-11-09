import { Controller, Post, Body } from '@nestjs/common';
import { CreatePermDto } from './dto/createPerm.dto';
import { PermsService } from './perms.service';

@Controller('perms')
export class PermsController {
  constructor(private readonly permsService: PermsService) {}

  @Post('createPerm')
  createPerm(@Body() permDto: CreatePermDto) {
    const perm = this.permsService.createPerm(permDto);
    return perm;
  }
}
