import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export enum ErrorMessage {
  INTERNAL_ERROR = 'An unexpected error occurred. Please try again.',
  NOT_FOUND = 'The item was not found.',
}

export function InternalError(logger: Logger, error: Error): Error {
  logger.error(error.message);

  return new InternalServerErrorException(ErrorMessage.INTERNAL_ERROR);
}

export function NotFoundError(logger: Logger, error: Error): Error {
  logger.error(error.message);

  return new NotFoundException(ErrorMessage.NOT_FOUND);
}
