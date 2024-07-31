import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devices } from 'src/devices/devices.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1',
      database: 'lineage',
      entities: [Devices],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Devices]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
