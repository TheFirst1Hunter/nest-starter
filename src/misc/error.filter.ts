import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let message: string;

    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      typeof exception.getStatus === 'function' ? exception.getStatus() : 400;

    if (exception instanceof HttpException) {
      message = exception.message;
    }

    // This is for Class-validator
    if (exception.response && exception.response.message) {
      message = Array.isArray(exception.response.message)
        ? exception.response.message[0]
        : exception.response.message;
    }
    // console.log(exception.response.message);

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
