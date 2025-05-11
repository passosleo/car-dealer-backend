export class ListUsersRequestDTO {
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
  ) {}

  public static create(data: ListUsersRequestDTO): ListUsersRequestDTO {
    return new ListUsersRequestDTO(
      data.page,
      data.limit,
      data.orderBy,
      data.search,
      data.status,
      data.createdAtStart,
      data.createdAtEnd,
      data.updatedAtStart,
      data.updatedAtEnd,
    );
  }
}
