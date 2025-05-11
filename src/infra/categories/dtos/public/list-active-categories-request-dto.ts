export class ListActiveCategoriesRequestDTO {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: 'asc' | 'desc',
    public readonly search?: string,
  ) {}

  public static create(data: ListActiveCategoriesRequestDTO): ListActiveCategoriesRequestDTO {
    return new ListActiveCategoriesRequestDTO(data.page, data.limit, data.orderBy, data.search);
  }
}
