export class TopBarMessageResponseDTO {
  constructor(
    public readonly topBarMessageId: string,
    public readonly message: string,
    public readonly link: string | null,
    public readonly position: number,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  public static create(data: TopBarMessageResponseDTO): TopBarMessageResponseDTO {
    return new TopBarMessageResponseDTO(
      data.topBarMessageId,
      data.message,
      data.link,
      data.position,
      data.active,
      data.createdAt,
      data.updatedAt,
    );
  }
}
