import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BUSINESSES } from '../../resume/static_data/index';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errors = exception.getResponse()['message'];
    const view = request.originalUrl.split('/').pop();

    const locals = {
      view: view,
      dto: request.body,
      errors: errors,
    };

    if (view === 'skills') locals['skills'] = BUSINESSES;

    response
      .status(status)
      .render(request.originalUrl.replace('/', ''), locals);
  }
}
