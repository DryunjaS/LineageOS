import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DevicesService } from './devices/devices.service';
import { DevicesModule } from './devices/devices.module';
import { GraphQLAppModule } from './graphql/graphql.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    DatabaseModule,
    DevicesModule,
    GraphQLAppModule,
  ],
  controllers: [AppController],
  providers: [AppService, DevicesService],
})
export class AppModule {}
