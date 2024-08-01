import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { Vendor } from 'src/vendor/vendor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Vendor])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
