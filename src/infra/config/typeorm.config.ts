import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type {
  TypeOrmModuleOptions,
  TypeOrmOptionsFactory,
} from '@nestjs/typeorm';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { EnvDto } from './env.dto';

@Injectable()
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService<EnvDto, true>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      logging: false,
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: this.configService.get('DATABASE_PORT'),
      database: this.configService.get('DATABASE_NAME'),
      username: this.configService.get('DATABASE_USERNAME'),
      password: this.configService.get('DATABASE_PASSWORD'),
      entities: ['dist/src/domain/entities/*.entity.js'],
      autoLoadEntities: true,
      migrations: ['dist/src/infra/migrations/*.js'],
      migrationsRun: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
