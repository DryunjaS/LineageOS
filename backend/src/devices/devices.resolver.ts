import { Resolver, Query } from '@nestjs/graphql';
import { DevicesService } from './devices.service';
import { PartialDeviceType } from 'src/graphql/types/devices.type';

@Resolver(() => PartialDeviceType)
export class DevicesResolver {
  constructor(private devicesService: DevicesService) {}

  @Query(() => [PartialDeviceType])
  async devices() {
    return this.devicesService.findAll();
  }
}
