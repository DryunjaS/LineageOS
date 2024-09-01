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
import * as path from 'path';
import { IresultCheak } from 'src/interface/device';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

@Controller('device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private configService: ConfigService,
  ) {}

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

  @Post('/create-device')
  async createDevice(@Body() deviceData: Partial<Device>): Promise<Device> {
    return this.deviceService.createDevice(deviceData);
  }

  // @Post('/upload-img-device/:id')
  // @UseInterceptors(
  //   FileInterceptor('image', {
  //     storage: diskStorage({
  //       destination: path.join(__dirname, '..', '..', '..', 'public', 'images'),
  //       filename: (req, file, callback) => {
  //         const uniqueSuffix = uuidv4() + extname(file.originalname);
  //         callback(null, uniqueSuffix);
  //       },
  //     }),
  //   }),
  // )
  // async uploadImage(
  //   @Param('id') id: number,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.deviceService.updateDeviceImage(id, file);
  // }

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

  @Put('/update-device/:id')
  async updateDevice(
    @Param('id') id: number,
    @Body() deviceData: Partial<Device>,
  ): Promise<Device> {
    return this.deviceService.changeDevice(id, deviceData);
  }

  //----Delete--------------------------------

  @Delete('/delete-device/:id')
  async deleteDevice(@Param('id') id: number): Promise<void> {
    return this.deviceService.deleteDevice(id);
  }
}
