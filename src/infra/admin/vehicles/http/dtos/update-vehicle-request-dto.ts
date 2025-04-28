export class UpdateVehicleRequestDTO {
  constructor(
    public readonly model: string,
    public readonly year: number,
    public readonly plate: string,
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
    public readonly brandId: string,
    public readonly categoryId: string,
    public readonly active: boolean,
    public readonly vehicleImages: string[] = [],
    public readonly vehicleFeatures: string[] = [],
  ) {}

  public static create(data: UpdateVehicleRequestDTO): UpdateVehicleRequestDTO {
    return new UpdateVehicleRequestDTO(
      data.model,
      data.year,
      data.plate,
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
      data.brandId,
      data.categoryId,
      data.active,
      data.vehicleImages,
      data.vehicleFeatures,
    );
  }
}
