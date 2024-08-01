import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from 'src/device/device.entity';
import { Vendor } from 'src/vendor/vendor.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'lineage',
      entities: [Device, Vendor],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Device, Vendor]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
