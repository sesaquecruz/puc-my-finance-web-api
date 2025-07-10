import { Expose, plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';

export class EnvDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  API_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  API_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATABASE_HOST: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  DATABASE_PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATABASE_NAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATABASE_USERNAME: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  DATABASE_PASSWORD: string;
}

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
