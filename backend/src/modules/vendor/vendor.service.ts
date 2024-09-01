import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorService {
  constructor(
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  async getVendors(): Promise<Vendor[]> {
    return this.vendorRepository.find();
  }

  async createVendor(vendorData: Partial<Vendor>): Promise<Vendor> {
    const newVendor = this.vendorRepository.create(vendorData);
    return this.vendorRepository.save(newVendor);
  }

  async changeVendor(id: number, vendorData: Partial<Vendor>): Promise<Vendor> {
    await this.vendorRepository.update(id, vendorData);
    return this.vendorRepository.findOne({ where: { id } });
  }

  async deleteVendor(id: number): Promise<void> {
    await this.vendorRepository.delete(id);
  }
}
