import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
@Injectable()
export class GqlRolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext): Promise<boolean> {
    // Ensure the result is a Promise
    const canActivateResult = Promise.resolve(super.canActivate(context));

    return canActivateResult.then((authResult) => {
      if (!authResult) {
        throw new UnauthorizedException();
      }

      const requiredRoles = this.reflector.get<string[]>(
        'roles',
        context.getHandler(),
      );
      if (!requiredRoles) {
        return true;
      }

      const request = this.getRequest(context);
      const user = request.user;

      const hasRole = () => requiredRoles.includes(user.role);
      // console.log(user);
      if (user && hasRole() && user.isActive) {
        return true;
      } else {
        throw new UnauthorizedException(
          'You do not have permission to perform this action',
        );
      }
    });
  }
}
