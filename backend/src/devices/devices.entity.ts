import { VendorType } from 'src/interface/device';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Devices {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  vendor: VendorType;
}
