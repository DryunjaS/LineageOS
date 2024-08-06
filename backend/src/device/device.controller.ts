import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Device } from './device.entity';
import { DeviceService } from './device.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Multer } from 'multer'; // Импортируем типы из multer

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

  @Post('/upload-img-device/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/images',
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + extname(file.originalname);
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Multer.File,
  ) {
    console.log('DFGHJKL');
    return this.deviceService.updateDeviceImage(id, file);
  }
}
