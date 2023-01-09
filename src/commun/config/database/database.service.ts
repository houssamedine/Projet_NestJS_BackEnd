import { User } from './../../../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const type = this.configService.get('DB.PROVIDER');
    const host = this.configService.get('DB.HOST');
    const port = this.configService.get('DB.PORT');
    const username = this.configService.get('DB.USERNAME');
    const password = this.configService.get('DB.PASSWORD');
    const database = this.configService.get('DB.NAME_DB');

    return {
      type,
      host,
      port,
      username,
      password,
      database,
      entities: [User],
      synchronize: true,
    };
  }
}
