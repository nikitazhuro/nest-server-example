import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth-jwt.guard';
import { Role } from 'src/auth/auth-roles.decorator';
import { AuthRoleGuard } from 'src/auth/auth-roles.guard';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  createUser(@Body() userCreateDto: UserCreateDto) {
    const user = this.userService.create(userCreateDto);
    return user;
  }

  @UseGuards(JwtAuthGuard, AuthRoleGuard)
  @Role('admin')
  @Get('users')
  getAllUsers() {
    return this.userService.getAllUser();
  }
}
