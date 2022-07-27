import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { Prisma } from '@prisma/client';
import { Environment } from '../types/environment';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    let message: string;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
      console.log(exception);
    }

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

    // Prisma errors
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const err: any = { ...exception };

      if (err.code === 'P2002') {
        message = `${err.meta.target[0]} field must be unique`;
      } else if (err.code === 'P2003') {
        message = `A constraint failed on the database: ${
          err.meta.field_name.split('_')[1]
        }`;
      } else if (err.code == 'P2005') {
        message = `The value ${err.meta.field_value} stored in the database for the field ${err.meta.field_name} is invalid for the field's type`;
      } else if (err.code === 'P2006') {
        message = `The provided value ${err.meta.field_value} for ${err.meta.model_name} field ${err.meta.field_name} is not valid`;
      } else if (err.code === 'P2007') {
        message = `data validation err ${err.meta.database_err}`;
      } else if (err.code === 'P2012') {
        message = `missing a required field ${err.meta.path}`;
      } else if (err.code === 'P2011') {
        message = `Null constraint violation on the ${err.meta.constraint}`;
      } else if (err.code === 'P2019') {
        message = `input err ${err.meta.details}`;
      } else if (err.code === 'P2025') {
        message = err.message;
      } else {
        message = err.message;
      }
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
