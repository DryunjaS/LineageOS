import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '../database/database.module';
import { VendorModule } from '../modules/vendor/vendor.module';
import { DeviceService } from '../modules/device/device.service';
import { DeviceController } from '../modules/device/device.controller';
import { DeviceModule } from '../modules/device/device.module';
import { VendorController } from '../modules/vendor/vendor.controller';
import { VendorService } from '../modules/vendor/vendor.service';
import { ConfigModule } from '@nestjs/config';
import configurations from 'src/configurations';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
    }),
    DatabaseModule,
    DeviceModule,
    VendorModule,
  ],
  controllers: [AppController, DeviceController, VendorController],
  providers: [AppService, DeviceService, VendorService],
})
export class AppModule {}
