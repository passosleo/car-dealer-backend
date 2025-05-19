import {
  Brand as BrandPrisma,
  Category as CategoryPrisma,
  VehicleFeature as VehicleFeaturePrisma,
  VehicleImage as VehicleImagePrisma,
  Vehicle as VehiclePrisma,
} from '@prisma/client';
import { Vehicle } from '../../../domain/vehicles/entities/vehicle-entity';
import { Decimal } from '@prisma/client/runtime/library';

type VehicleFromPrisma = VehiclePrisma & {
  vehicleImages: VehicleImagePrisma[];
  vehicleFeatures: VehicleFeaturePrisma[];
  brand: BrandPrisma;
  category: CategoryPrisma;
};

type VehicleToPrisma = VehiclePrisma & {
  vehicleImages: string[];
  vehicleFeatures: string[];
};

export class VehicleMapperPrisma {
  public static toDomain({ vehicleImages, vehicleFeatures, price, torque, ...data }: VehicleFromPrisma): Vehicle {
    return Vehicle.create({
      ...data,
      price: Number(price),
      torque: Number(torque),
      vehicleImages: vehicleImages.map((vehicleImage) => vehicleImage.imageUrl),
      vehicleFeatures: vehicleFeatures.map((vehicleFeature) => vehicleFeature.feature),
    });
  }

  public static toPrisma(data: Vehicle | Partial<Vehicle>): VehicleToPrisma {
    return {
      vehicleId: data.vehicleId,
      model: data.model,
      year: data.year,
      plate: data.plate,
      description: data.description,
      price: data.price as unknown as Decimal,
      mileage: data.mileage,
      color: data.color,
      transmission: data.transmission,
      fuelType: data.fuelType,
      doors: data.doors,
      seats: data.seats,
      horsepower: data.horsepower,
      torque: data.torque,
      driveTrain: data.driveTrain,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      vehicleImages: data.vehicleImages,
      vehicleFeatures: data.vehicleFeatures,
      brandId: data.brand ? data.brand.brandId : undefined,
      categoryId: data.category ? data.category.categoryId : undefined,
    } as VehicleToPrisma;
  }
}
