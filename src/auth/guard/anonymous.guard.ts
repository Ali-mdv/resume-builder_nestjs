import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AnonymousGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (request.isAuthenticated()) {
      return response.redirect('/resume');
    }
    return true;
  }
}
