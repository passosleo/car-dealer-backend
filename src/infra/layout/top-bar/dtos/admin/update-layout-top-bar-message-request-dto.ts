export class UpdateLayoutTopBarMessageRequestDTO {
  constructor(
    public readonly message: string,
    public readonly link?: string | null,
    public readonly active?: boolean,
  ) {}

  public static create(data: UpdateLayoutTopBarMessageRequestDTO): UpdateLayoutTopBarMessageRequestDTO {
    return new UpdateLayoutTopBarMessageRequestDTO(data.message, data.link, data.active);
  }
}
