import { UpdateLayoutTopBarMessageRequestDTO } from './update-layout-top-bar-message-request-dto';

export class UpdateLayoutTopBarConfigRequestDTO {
  constructor(
    public readonly maxItems?: number,
    public readonly loop?: boolean,
    public readonly delay?: number,
    public readonly direction?: string | null,
    public readonly jump?: boolean,
    public readonly hideOnMobile?: boolean,
    public readonly hideOnDesktop?: boolean,
    public readonly layoutTopBarMessages?: UpdateLayoutTopBarMessageRequestDTO[],
  ) {}

  public static create(data: UpdateLayoutTopBarConfigRequestDTO): UpdateLayoutTopBarConfigRequestDTO {
    return new UpdateLayoutTopBarConfigRequestDTO(
      data.maxItems,
      data.loop,
      data.delay,
      data.direction,
      data.jump,
      data.hideOnMobile,
      data.hideOnDesktop,
      data.layoutTopBarMessages?.map(UpdateLayoutTopBarMessageRequestDTO.create),
    );
  }
}
