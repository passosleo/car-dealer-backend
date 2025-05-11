import { Prisma } from '@prisma/client';
import { prisma } from '../../../../shared/db';
import { Paginated } from '../../../../shared/types/generic';
import {
  IVehicleRepository,
  ListVehiclesParams,
} from '../../../../../domain/admin/vehicles/repositories/vehicle-repository';
import { Vehicle } from '../../../../../domain/admin/vehicles/entities/vehicle-entity';
import { VehicleMapperPrisma } from '../mappers/vehicle-mapper-prisma';

export class VehicleRepositoryPrisma implements IVehicleRepository {
  private readonly includeFields = {
    brand: true,
    category: true,
    vehicleImages: true,
    vehicleFeatures: true,
  };

  public async create(data: Vehicle): Promise<Vehicle> {
    const { vehicleImages, vehicleFeatures, ...prismaData } = VehicleMapperPrisma.toPrisma(data);

    const createdVehicle = await prisma.vehicle.create({
      data: {
        ...prismaData,
        vehicleImages: {
          create: vehicleImages.map((image) => ({
            imageUrl: image,
          })),
        },
        vehicleFeatures: {
          create: vehicleFeatures.map((feature) => ({
            feature,
          })),
        },
      },
      include: this.includeFields,
    });

    return VehicleMapperPrisma.toDomain(createdVehicle);
  }

  public async update(id: string, data: Partial<Vehicle>): Promise<Vehicle> {
    const { vehicleImages, vehicleFeatures, ...prismaData } = VehicleMapperPrisma.toPrisma(data);

    const [currentAssociatedImages, currentAssociatedFeatures] = await Promise.all([
      prisma.vehicleImage.findMany({
        where: { vehicleId: id },
        select: { imageUrl: true },
      }),
      prisma.vehicleFeature.findMany({
        where: { vehicleId: id },
        select: { feature: true },
      }),
    ]);

    const currentImageUrls = currentAssociatedImages.map((image) => image.imageUrl);
    const currentFeatureNames = currentAssociatedFeatures.map((feature) => feature.feature);

    const newImageUrls = vehicleImages ?? [];
    const newFeatureNames = vehicleFeatures ?? [];

    const imagesToAdd = newImageUrls.filter((imageUrl) => !currentImageUrls.includes(imageUrl));
    const imagesToRemove = currentImageUrls.filter((imageUrl) => !newImageUrls.includes(imageUrl));

    const featuresToAdd = newFeatureNames.filter((featureName) => !currentFeatureNames.includes(featureName));
    const featuresToRemove = currentFeatureNames.filter((featureName) => !newFeatureNames.includes(featureName));

    const updatedVehicle = await prisma.vehicle.update({
      where: { vehicleId: id },
      data: {
        ...prismaData,
        vehicleImages: {
          deleteMany: imagesToRemove.length > 0 ? { vehicleId: id, imageUrl: { in: imagesToRemove } } : undefined,
          create: imagesToAdd.length > 0 ? imagesToAdd.map((imageUrl) => ({ imageUrl })) : undefined,
        },
        vehicleFeatures: {
          deleteMany: featuresToRemove.length > 0 ? { vehicleId: id, feature: { in: featuresToRemove } } : undefined,
          create: featuresToAdd.length > 0 ? featuresToAdd.map((feature) => ({ feature })) : undefined,
        },
      },
      include: this.includeFields,
    });

    return VehicleMapperPrisma.toDomain(updatedVehicle);
  }

  public async delete(id: string): Promise<void> {
    await prisma.vehicle.delete({ where: { vehicleId: id } });
  }

  public async findById(id: string): Promise<Vehicle | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: { vehicleId: id },
      include: this.includeFields,
    });
    return vehicle ? VehicleMapperPrisma.toDomain(vehicle) : null;
  }

  public async findByPlate(plate: string): Promise<Vehicle | null> {
    const vehicle = await prisma.vehicle.findUnique({
      where: { plate },
      include: this.includeFields,
    });
    return vehicle ? VehicleMapperPrisma.toDomain(vehicle) : null;
  }

  public async list({
    page = 1,
    limit = 10,
    orderBy = 'asc',
    ...params
  }: ListVehiclesParams): Promise<Paginated<Vehicle>> {
    const where: Prisma.VehicleWhereInput = {
      active: params.status === 'active' ? true : params.status === 'inactive' ? false : undefined,
      createdAt: {
        gte: params.createdAtStart,
        lte: params.createdAtEnd,
      },
      updatedAt: {
        gte: params.updatedAtStart,
        lte: params.updatedAtEnd,
      },
      ...(params.search
        ? {
            OR: [
              { model: { contains: params.search, mode: 'insensitive' } },
              { description: { contains: params.search, mode: 'insensitive' } },
              { year: { equals: isNaN(Number(params.search)) ? undefined : Number(params.search) } },
              { color: { contains: params.search, mode: 'insensitive' } },
            ],
          }
        : {}),
      ...(params.priceStart || params.priceEnd
        ? {
            price: {
              gte: params.priceStart,
              lte: params.priceEnd,
            },
          }
        : {}),
      ...(params.mileageStart || params.mileageEnd
        ? {
            mileage: {
              gte: params.mileageStart,
              lte: params.mileageEnd,
            },
          }
        : {}),
      ...(params.yearStart || params.yearEnd
        ? {
            year: {
              gte: params.yearStart,
              lte: params.yearEnd,
            },
          }
        : {}),
      ...(params.doors
        ? {
            doors: {
              equals: params.doors,
            },
          }
        : {}),
      ...(params.seats
        ? {
            seats: {
              equals: params.seats,
            },
          }
        : {}),
      ...(params.horsepowerStart || params.horsepowerEnd
        ? {
            horsepower: {
              gte: params.horsepowerStart,
              lte: params.horsepowerEnd,
            },
          }
        : {}),
    };

    const [total, data] = await Promise.all([
      prisma.vehicle.count({ where }),
      prisma.vehicle.findMany({
        where,
        orderBy: { model: orderBy },
        skip: (page - 1) * limit,
        take: limit,
        include: this.includeFields,
      }),
    ]);

    return {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      items: data.map(VehicleMapperPrisma.toDomain),
    };
  }
}
