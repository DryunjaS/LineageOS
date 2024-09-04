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
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';
import { UsersController } from 'src/modules/users/users.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtService } from '@nestjs/jwt';

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
    UsersModule,
    AuthModule,
  ],
  controllers: [
    AppController,
    DeviceController,
    VendorController,
    AuthController,
    UsersController,
  ],
  providers: [
    AppService,
    DeviceService,
    VendorService,
    AuthService,
    UsersService,
    JwtService,
  ],
})
export class AppModule {}
