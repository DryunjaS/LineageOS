import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { Vendor } from 'src/vendor/vendor.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private deviceRepository: Repository<Device>,
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  async getDeviceById(id: number): Promise<Device> {
    try {
      const device = await this.deviceRepository.findOne({
        where: { id },
        relations: ['vendor'], // добавляем связь с таблицей vendor
      });

      if (!device) {
        throw new Error('Device not found');
      }

      return device;
    } catch (error) {
      throw new Error(`Failed to get device: ${error.message}`);
    }
  }

  async getDevicesGroupedByVendor(): Promise<any> {
    const vendors = await this.vendorRepository.find({
      relations: ['devices'],
    });

    return vendors.map((vendor) => ({
      ...vendor,
      devices: vendor.devices.map((device) => ({
        id: device.id,
        name: device.name,
      })),
    }));
  }

  async createDevice(deviceData: Partial<Device>): Promise<Device> {
    if (!deviceData.vendor || !deviceData.vendor.id) {
      throw new NotFoundException('Vendor not found');
    }

    const newDevice = this.deviceRepository.create(deviceData);
    return this.deviceRepository.save(newDevice);
  }

  async changeDevice(id: number, deviceData: Partial<Device>): Promise<Device> {
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });
    if (!device) {
      throw new NotFoundException('Device not found');
    }

    if (deviceData.vendor && deviceData.vendor.id) {
      const vendor = await this.vendorRepository.findOneBy({
        id: deviceData.vendor.id,
      });
      if (!vendor) {
        throw new NotFoundException('Vendor not found');
      }
      device.vendor = vendor;
    }

    Object.assign(device, deviceData);
    return this.deviceRepository.save(device);
  }

  async deleteDevice(id: number): Promise<void> {
    const result = await this.deviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Device not found');
    }
  }
}
