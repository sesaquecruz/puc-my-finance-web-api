import { InternalServerErrorException, Logger } from '@nestjs/common';

export function InternalError(logger: Logger, error: Error): Error {
  logger.error(error);

  return new InternalServerErrorException(
    'An unexpected error occurred. Please try again.',
  );
}
