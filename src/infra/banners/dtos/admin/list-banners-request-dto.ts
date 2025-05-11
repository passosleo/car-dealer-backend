export class ListBannersRequestDTO {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: 'asc' | 'desc',
    public readonly search?: string,
    public readonly status?: 'all' | 'active' | 'inactive',
    public readonly startAtStart?: Date,
    public readonly startAtEnd?: Date,
    public readonly endAtStart?: Date,
    public readonly endAtEnd?: Date,
    public readonly createdAtStart?: Date,
    public readonly createdAtEnd?: Date,
    public readonly updatedAtStart?: Date,
    public readonly updatedAtEnd?: Date,
  ) {}

  public static create(data: ListBannersRequestDTO): ListBannersRequestDTO {
    return new ListBannersRequestDTO(
      data.page,
      data.limit,
      data.orderBy,
      data.search,
      data.status,
      data.startAtStart,
      data.startAtEnd,
      data.endAtStart,
      data.endAtEnd,
      data.createdAtStart,
      data.createdAtEnd,
      data.updatedAtStart,
      data.updatedAtEnd,
    );
  }
}
