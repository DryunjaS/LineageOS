import { InfoDevice, NameDevice, SpecificDevice } from 'src/interface/device';
import { Vendor } from 'src/vendor/vendor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Device {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Vendor, (vendor) => vendor.devices)
  @JoinColumn({ name: 'vendorID' })
  vendor: Vendor;

  @Column('json')
  name: NameDevice;

  @Column('json')
  info: InfoDevice;

  @Column('json')
  specific: SpecificDevice;
}
