import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from '../guards/user-role/user-role.guard';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { validRoles } from '../interfaces/valid-roles';
import { RoleProtected } from './role-protected.decorator';

export function Auth(...roles: validRoles[]) {
  return applyDecorators(
    RoleProtected(...roles),
    UseGuards(AuthGuard(), UserRoleGuard),
    ApiBearerAuth(),
    // ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
