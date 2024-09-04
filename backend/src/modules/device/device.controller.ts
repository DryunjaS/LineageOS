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
  UseGuards,
} from '@nestjs/common';
import { Device } from './device.entity';
import { DeviceService } from './device.service';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { IresultCheak } from 'src/interface/device';
import * as sharp from 'sharp';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  //----Get--------------------------------

  @Get('/get-device/:id')
  async getDeviceById(@Param('id') id: number): Promise<Device> {
    return this.deviceService.getDeviceById(id);
  }

  @Get('/get-devices-group-vendor')
  async getDevicesGroupedByVendor() {
    return this.deviceService.getDevicesGroupedByVendor();
  }

  //----Post--------------------------------
  @UseGuards(JwtAuthGuard)
  @Post('/create-device')
  async createDevice(@Body() deviceData: Partial<Device>): Promise<Device> {
    return this.deviceService.createDevice(deviceData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/upload-img-device/:id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: path.join(__dirname, '..', '..', '..', 'public', 'images'),
        filename: (req, file, callback) => {
          const uniqueSuffix = uuidv4() + path.extname(file.originalname); // Оставляем оригинальное расширение
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadImage(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new Error('File not found');
    }

    const outputFilePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'public',
      'images',
      uuidv4() + '.webp',
    );

    try {
      await sharp(file.path)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({
          quality: 80,
          lossless: false,
        })
        .toFile(outputFilePath);

      return this.deviceService.updateDeviceImage(id, {
        ...file,
        filename: path.basename(outputFilePath),
      });
    } catch (error) {
      throw new Error('Image processing failed: ' + error.message);
    }
  }

  @Post('/filter-device')
  async filterDevice(
    @Body() filterData: Partial<IresultCheak[]>,
  ): Promise<Device[]> {
    return this.deviceService.filterDevices(filterData);
  }
  //----Put--------------------------------

  @UseGuards(JwtAuthGuard)
  @Put('/update-device/:id')
  async updateDevice(
    @Param('id') id: number,
    @Body() deviceData: Partial<Device>,
  ): Promise<Device> {
    return this.deviceService.changeDevice(id, deviceData);
  }

  //----Delete--------------------------------

  @UseGuards(JwtAuthGuard)
  @Delete('/delete-device/:id')
  async deleteDevice(@Param('id') id: number): Promise<void> {
    return this.deviceService.deleteDevice(id);
  }
}
