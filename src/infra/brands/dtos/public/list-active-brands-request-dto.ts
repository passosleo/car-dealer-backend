export class ListActiveBrandsRequestDTO {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: 'asc' | 'desc',
    public readonly search?: string,
  ) {}

  public static create(data: ListActiveBrandsRequestDTO): ListActiveBrandsRequestDTO {
    return new ListActiveBrandsRequestDTO(data.page, data.limit, data.orderBy, data.search);
  }
}
