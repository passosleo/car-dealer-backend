export class CreateTopBarMessageRequestDTO {
  constructor(
    public readonly message: string,
    public readonly link?: string | null,
    public readonly position?: number,
    public readonly active?: boolean,
  ) {}

  public static create(data: CreateTopBarMessageRequestDTO): CreateTopBarMessageRequestDTO {
    return new CreateTopBarMessageRequestDTO(data.message, data.link, data.position, data.active);
  }
}
