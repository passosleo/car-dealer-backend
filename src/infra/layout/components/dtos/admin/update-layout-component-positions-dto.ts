export class UpdateLayoutComponentPositionsRequestDTO {
  constructor(public readonly layoutComponentId: string) {}

  public static create(data: UpdateLayoutComponentPositionsRequestDTO): UpdateLayoutComponentPositionsRequestDTO {
    return new UpdateLayoutComponentPositionsRequestDTO(data.layoutComponentId);
  }
}
