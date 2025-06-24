export class LayoutTopBarMessageResponseDTO {
  constructor(
    public readonly layoutTopBarMessageId: string,
    public readonly layoutTopBarConfigId: string,
    public readonly message: string,
    public readonly link: string | null,
    public readonly position: number,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: LayoutTopBarMessageResponseDTO): LayoutTopBarMessageResponseDTO {
    return new LayoutTopBarMessageResponseDTO(
      data.layoutTopBarMessageId,
      data.layoutTopBarConfigId,
      data.message,
      data.link,
      data.position,
      data.active,
      data.createdAt,
      data.updatedAt,
    );
  }
}
