import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class NameDevice {
  @Field()
  Model: string;

  @Field()
  Code: string;
}

@ObjectType()
class DeviceType {
  @Field(() => NameDevice)
  Name: NameDevice;
}

@ObjectType()
class VendorType {
  @Field()
  Name: string;

  @Field(() => DeviceType)
  Device: DeviceType;
}

@ObjectType()
export class PartialDeviceType {
  @Field(() => VendorType)
  vendor: VendorType;
}
