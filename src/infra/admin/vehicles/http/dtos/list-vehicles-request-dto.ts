export class ListVehiclesRequestDTO {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: 'asc' | 'desc',
    public readonly search?: string,
    public readonly status?: 'all' | 'active' | 'inactive',
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
    public readonly updatedAtStart?: Date,
    public readonly updatedAtEnd?: Date,
    public readonly priceStart?: number,
    public readonly priceEnd?: number,
    public readonly mileageStart?: number,
    public readonly mileageEnd?: number,
    public readonly yearStart?: number,
    public readonly yearEnd?: number,
    public readonly doors?: number,
    public readonly seats?: number,
    public readonly horsepowerStart?: number,
    public readonly horsepowerEnd?: number,
  ) {}

  public static create(data: ListVehiclesRequestDTO): ListVehiclesRequestDTO {
    return new ListVehiclesRequestDTO(
      data.page,
      data.limit,
      data.orderBy,
      data.search,
      data.status,
      data.createdAtStart,
      data.createdAtEnd,
      data.updatedAtStart,
      data.updatedAtEnd,
      data.priceStart,
      data.priceEnd,
      data.mileageStart,
      data.mileageEnd,
      data.yearStart,
      data.yearEnd,
      data.doors,
      data.seats,
      data.horsepowerStart,
      data.horsepowerEnd,
    );
  }
}
