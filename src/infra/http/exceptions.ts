import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

export function InternalError(logger: Logger, error: Error): Error {
  logger.error(error);

  return new InternalServerErrorException(
    'An unexpected error occurred. Please try again.',
  );
}

export function NotFoundError(logger: Logger, error: Error): Error {
  logger.error(error);

  return new NotFoundException('The requested item was not found.');
}
