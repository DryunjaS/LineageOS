import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { Device } from './device.entity';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get('/get-device/:id')
  async getDeviceById(@Param('id') id: number): Promise<Device> {
    return this.deviceService.getDeviceById(id);
  }

  @Get('/get-devices-group-vendor')
  async getDevicesGroupedByVendor() {
    return this.deviceService.getDevicesGroupedByVendor();
  }

  @Post('/create-device')
  async createDevice(@Body() deviceData: Partial<Device>): Promise<Device> {
    return this.deviceService.createDevice(deviceData);
  }

  @Put('/update-device/:id')
  async updateDevice(
    @Param('id') id: number,
    @Body() deviceData: Partial<Device>,
  ): Promise<Device> {
    return this.deviceService.changeDevice(id, deviceData);
  }

  @Delete('/delete-device/:id')
  async deleteDevice(@Param('id') id: number): Promise<void> {
    return this.deviceService.deleteDevice(id);
  }
}
