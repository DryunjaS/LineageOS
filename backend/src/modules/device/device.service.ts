import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { Vendor } from 'src/modules/vendor/vendor.entity';
import { Multer } from 'multer';
import { IresultCheak } from 'src/interface/device';

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
        relations: ['vendor'],
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

  async updateDeviceImage(id: number, file: Express.Multer.File) {
    console.log(file.filename);
    const device = await this.deviceRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });
    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found`);
    }
    device.name.Img = file.filename;
    await this.deviceRepository.save(device);
    return {
      message: `Image for device ${id} uploaded successfully`,
      filename: file.filename,
    };
  }

  async filterDevices(filters: IresultCheak[]): Promise<any> {
    // Получаем всех поставщиков
    const vendors = await this.vendorRepository.find();

    // Получаем все устройства с информацией о поставщике
    const devices = await this.deviceRepository.find({
      relations: ['vendor'],
    });

    // Общее количество устройств
    const totalDevicesCount = devices.length;

    // Фильтруем устройства на основе переданных критериев
    const filteredDevices = devices.filter((device) => {
      return filters.every((filter) => {
        switch (filter.category) {
          case 'Архитектура':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications.Архитектура &&
                filter.optionsTrue.includes(
                  device.specific.Specifications.Архитектура[0],
                ))
            );

          case 'SoC':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications.SoC &&
                filter.optionsTrue.includes(
                  device.specific.Specifications.SoC[0],
                ))
            );

          case 'Сеть':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications.Сеть &&
                filter.optionsTrue.some((option) =>
                  device.specific.Specifications.Сеть.includes(option),
                ))
            );

          case 'Wi-Fi':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications['Wi-Fi'] &&
                filter.optionsTrue.some((option) =>
                  device.specific.Specifications['Wi-Fi'].includes(option),
                ))
            );

          case 'Версии LineageOS':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.LineageOS_info['Версии LineageOS'] &&
                filter.optionsTrue.includes(
                  device.specific.LineageOS_info['Версии LineageOS'][0].split(
                    ' ',
                  )[0],
                ))
            );

          case 'Версии ядра':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.LineageOS_info['Версии ядра'] &&
                filter.optionsTrue.includes(
                  device.specific.LineageOS_info['Версии ядра'][0].split(
                    ' ',
                  )[0],
                ))
            );

          case 'Слот для SD-карты':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications['Слот для SD-карты'] &&
                filter.optionsTrue.includes(
                  device.specific.Specifications['Слот для SD-карты'][0],
                ))
            );

          case 'Тип устройства':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications['Тип устройства'] &&
                filter.optionsTrue.includes(
                  device.specific.Specifications['Тип устройства'][0],
                ))
            );

          case 'Минимальный размер экрана в дюймах':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications['Экран'] &&
                Number(
                  device.specific.Specifications['Экран'][0].split(' ')[0],
                ) >= Number(filter.optionsTrue[0]))
            );

          case 'Максимальный размер экрана в дюймах':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Specifications['Экран'] &&
                Number(
                  device.specific.Specifications['Экран'][0].split(' ')[0],
                ) <= Number(filter.optionsTrue[0]))
            );

          case 'Минимальный год выпуска':
            return (
              filter.optionsTrue.length === 0 ||
              (device.specific.Main['Выпущен'] &&
                new Date(device.specific.Main['Выпущен'][0]) >=
                  new Date(filter.optionsTrue[0]))
            );

          default:
            return true;
        }
      });
    });

    // Сгруппируем отфильтрованные устройства по поставщикам
    const groupedDevices = vendors
      .map((vendor) => {
        // Отфильтровываем устройства для текущего поставщика
        const vendorDevices = filteredDevices.filter(
          (device) => device.vendor.id === vendor.id,
        );

        return {
          id: vendor.id,
          name: vendor.name,
          devices: vendorDevices.map((device) => ({
            id: device.id,
            name: device.name,
          })),
        };
      })
      // Исключаем поставщиков с пустым массивом устройств
      .filter((vendorGroup) => vendorGroup.devices.length > 0);

    // Количество отфильтрованных устройств
    const filteredDevicesCount = filteredDevices.length;

    // Формируем объект для возврата
    return {
      groupedDevices,
      filteredDevicesCount,
      totalDevicesCount,
    };
  }
}
