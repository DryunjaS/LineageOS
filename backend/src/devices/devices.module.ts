import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Devices } from './devices.entity';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesResolver } from './devices.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Devices])],
  providers: [DevicesService, DevicesResolver],
  controllers: [DevicesController],
})
export class DevicesModule {}
