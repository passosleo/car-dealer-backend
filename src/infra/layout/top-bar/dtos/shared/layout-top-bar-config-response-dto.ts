import { LayoutTopBarMessageResponseDTO } from './layout-top-bar-message-response-dto';

export class LayoutTopBarConfigResponseDTO {
  constructor(
    public readonly layoutTopBarConfigId: string,
    public readonly layoutComponentId: string,
    public readonly maxItems: number,
    public readonly loop: boolean,
    public readonly delay: number,
    public readonly direction: string | null,
    public readonly jump: boolean,
    public readonly hideOnMobile: boolean,
    public readonly hideOnDesktop: boolean,
    public readonly active: boolean,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly layoutTopBarMessages: LayoutTopBarMessageResponseDTO[],
  ) {}

  public static create(data: LayoutTopBarConfigResponseDTO): LayoutTopBarConfigResponseDTO {
    return new LayoutTopBarConfigResponseDTO(
      data.layoutTopBarConfigId,
      data.layoutComponentId,
      data.maxItems,
      data.loop,
      data.delay,
      data.direction,
      data.jump,
      data.hideOnMobile,
      data.hideOnDesktop,
      data.active,
      data.createdAt,
      data.updatedAt,
      data.layoutTopBarMessages.map(LayoutTopBarMessageResponseDTO.create),
    );
  }
}
