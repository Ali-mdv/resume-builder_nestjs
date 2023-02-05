import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  BUSINESSES,
  LANGUAGES,
  SKILLS,
  LEVELS,
} from '../../resume/static_data/index';

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

    if (view.includes('skills')) locals['skills'] = SKILLS;
    if (view === 'basic_info') {
      locals['businesses'] = BUSINESSES;
      locals['languages'] = LANGUAGES;
    }
    if (view.includes('education')) locals['levels'] = LEVELS;

    // remove uuid from url in update routes
    const path = request.path.split('/').slice(0, 3).join('/').replace('/', '');

    response.status(status).render(path, locals);
  }
}
