import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotAcceptableException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotAcceptableException)
export class NotAcceptableExceptionFilter implements ExceptionFilter {
  catch(exception: NotAcceptableException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const view = request.originalUrl.split('/').pop();

    response.status(status).render(`auth/${view}`, {
      view: view,
      dto: request.body,
      errors: 'email or password invalid.',
    });
  }
}
