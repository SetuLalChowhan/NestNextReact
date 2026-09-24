import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '../../auth/decorators/roles.decorator.js';
import { RolesGuard } from '../../auth/guards/roles.guard.js';

/**
 * Composite authentication and authorization decorator.
 * Enforces role-based guards (default-deny for specified roles).
 * 
 * Usage:
 *   @Auth('USER')
 *   @Auth('ADMIN')
 *   @Auth('ADMIN', 'USER')
 */
export const Auth = (...roles: string[]) => {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(RolesGuard));
  }
  return applyDecorators(UseGuards(RolesGuard));
};
