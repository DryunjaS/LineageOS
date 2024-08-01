import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { VendorModule } from './vendor/vendor.module';
import { DeviceService } from './device/device.service';
import { DeviceController } from './device/device.controller';
import { DeviceModule } from './device/device.module';
import { VendorController } from './vendor/vendor.controller';
import { VendorService } from './vendor/vendor.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
    DeviceModule,
    VendorModule,
  ],
  controllers: [AppController, DeviceController, VendorController],
  providers: [AppService, DeviceService, VendorService],
})
export class AppModule {}
