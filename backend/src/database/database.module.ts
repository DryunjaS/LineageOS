import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/modules/device/device.entity';
import { Vendor } from 'src/modules/vendor/vendor.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres'>('db_type'),
        host: configService.get<string>('db_host'),
        port: configService.get<number>('db_port'),
        username: configService.get<string>('db_user'),
        password: configService.get<string>('db_password'),
        database: configService.get<string>('db_name'),
        entities: [Device, Vendor],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Device, Vendor]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
