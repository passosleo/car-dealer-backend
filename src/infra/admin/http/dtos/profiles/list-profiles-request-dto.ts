export class ListProfilesRequestDTO {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: 'asc' | 'desc',
    public readonly search?: string,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
    public readonly updatedAtStart?: Date,
    public readonly updatedAtEnd?: Date,
  ) {}

  public static create(data: ListProfilesRequestDTO): ListProfilesRequestDTO {
    return new ListProfilesRequestDTO(
      data.page,
      data.limit,
      data.orderBy,
      data.search,
      data.createdAtStart,
      data.createdAtEnd,
      data.updatedAtStart,
      data.updatedAtEnd,
    );
  }
}
