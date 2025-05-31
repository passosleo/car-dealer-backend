export class ListActiveSellersRequestDTO {
  constructor(
    public readonly page?: number,
    public readonly limit?: number,
    public readonly orderBy?: 'asc' | 'desc',
    public readonly search?: string,
  ) {}

  public static create(data: ListActiveSellersRequestDTO): ListActiveSellersRequestDTO {
    return new ListActiveSellersRequestDTO(data.page, data.limit, data.orderBy, data.search);
  }
}
