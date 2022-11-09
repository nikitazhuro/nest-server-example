import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { PermsModel } from 'src/perms/perms.model';
import { ROLES_KEY } from './auth-roles.decorator';

@Injectable()
export class AuthRoleGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const roles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      const autorization = req.headers?.authorization?.split(' ');

      const bearer = autorization[0];
      const token = autorization[1];

      if (bearer !== 'Bearer' || !token) {
        throw new HttpException(
          'В авторизации отказано',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const user = this.jwtService.verify(token);

      req.user = user;

      return user?.perms.some((el: PermsModel) => roles.includes(el.value));
    } catch (error) {
      throw new HttpException('В доступе отказано', HttpStatus.UNAUTHORIZED);
    }
  }
}
