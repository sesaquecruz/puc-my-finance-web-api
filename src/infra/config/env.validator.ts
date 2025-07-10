import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

import { EnvDto } from './env.dto';

export function envValidator(config: Record<string, unknown>): EnvDto {
  const values = plainToInstance(EnvDto, config, {
    enableImplicitConversion: true,
    excludeExtraneousValues: true,
  });

  const errors = validateSync(values, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return values;
}
