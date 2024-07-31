import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Devices } from './devices.entity';
import { Repository } from 'typeorm';
import { PartialDevice } from 'src/interface/device';

@Injectable()
export class DevicesService {
  constructor(
    @InjectRepository(Devices)
    private devicesRepository: Repository<Devices>,
  ) {}
  async findAll(): Promise<PartialDevice[]> {
    const devices = await this.devicesRepository.find();
    return devices.map((device) => ({
      vendor: {
        Name: device.vendor.Name,
        Device: {
          Name: {
            Model: device.vendor.Device.Name.Model,
            Code: device.vendor.Device.Name.Code,
          },
        },
      },
    }));
  }
  findDevices(): Promise<Devices[]> {
    return this.devicesRepository.find();
  }
  createDevices(): Promise<Devices[]> {
    return this.devicesRepository.find();
  }
  changeDevices(): Promise<Devices[]> {
    return this.devicesRepository.find();
  }
  deleteDevices(): Promise<Devices[]> {
    return this.devicesRepository.find();
  }
}
