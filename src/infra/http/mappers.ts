import { plainToInstance, ClassConstructor } from 'class-transformer';

export function mapEntityToResponseDto<E, R>(
  entity: E,
  responseDto: ClassConstructor<R>,
): R {
  return plainToInstance(responseDto, entity, {
    excludeExtraneousValues: true,
  });
}
