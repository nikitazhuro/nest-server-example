import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles_key';

export const Role = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
