import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';

@Controller('vendor')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Get('/get-vendors')
  async getVendors(): Promise<Vendor[]> {
    return this.vendorService.getVendors();
  }

  @Post('/create-vendor')
  async createVendor(@Body() vendorData: Partial<Vendor>): Promise<Vendor> {
    return this.vendorService.createVendor(vendorData);
  }

  @Put('/update-vendor/:id')
  async updateVendor(
    @Param('id') id: number,
    @Body() vendorData: Partial<Vendor>,
  ): Promise<Vendor> {
    return this.vendorService.changeVendor(id, vendorData);
  }

  @Delete('/delete-vendor/:id')
  async deleteVendor(@Param('id') id: number): Promise<void> {
    return this.vendorService.deleteVendor(id);
  }
}
