import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errors = exception.getResponse()['message'];
    const view = request.originalUrl.split('/').pop();

    response.status(status).render(request.originalUrl.replace('/', ''), {
      view: view,
      dto: request.body,
      errors: errors,
    });
  }
}
