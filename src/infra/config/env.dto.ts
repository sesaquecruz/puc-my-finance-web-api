import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

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
