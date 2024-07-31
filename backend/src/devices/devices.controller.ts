import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { Devices } from './devices.entity';
import { PartialDeviceType } from 'src/graphql/types/devices.type';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Get('/')
  findAll(): Promise<Partial<PartialDeviceType>[]> {
    return this.devicesService.findAll();
  }
  @Get('/:devices')
  findDevices(): Promise<Devices[]> {
    return this.devicesService.findDevices();
  }
  @Post('/:devices')
  createDevices(): Promise<Devices[]> {
    return this.devicesService.createDevices();
  }
  @Put('/:devices')
  changeDevices(): Promise<Devices[]> {
    return this.devicesService.changeDevices();
  }
  @Delete('/:devices')
  deleteDevices(): Promise<Devices[]> {
    return this.devicesService.deleteDevices();
  }
}
