import { BrandResponseDTO } from '../../../brands/http/dtos/brand-response-dto';
import { CategoryResponseDTO } from '../../../categories/http/dtos/category-response-dto';

export class VehicleResponseDTO {
  constructor(
    public readonly vehicleId: string,
    public readonly model: string,
    public readonly year: number,
    public readonly description: string | null,
    public readonly price: number | null,
    public readonly mileage: number | null,
    public readonly color: string | null,
    public readonly transmission: string | null,
    public readonly fuelType: string | null,
    public readonly doors: number | null,
    public readonly seats: number | null,
    public readonly horsepower: number | null,
    public readonly torque: number | null,
    public readonly driveTrain: string | null,
    public readonly brand: BrandResponseDTO,
    public readonly category: CategoryResponseDTO,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly vehicleImages: string[] = [],
    public readonly vehicleFeatures: string[] = [],
  ) {}

  public static create(data: VehicleResponseDTO): VehicleResponseDTO {
    return new VehicleResponseDTO(
      data.vehicleId,
      data.model,
      data.year,
      data.description,
      data.price,
      data.mileage,
      data.color,
      data.transmission,
      data.fuelType,
      data.doors,
      data.seats,
      data.horsepower,
      data.torque,
      data.driveTrain,
      BrandResponseDTO.create(data.brand),
      CategoryResponseDTO.create(data.category),
      data.active,
      data.createdAt,
      data.updatedAt,
      data.vehicleImages,
      data.vehicleFeatures,
    );
  }
}
