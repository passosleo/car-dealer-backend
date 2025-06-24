import { LayoutTopBarConfig } from '../../../../../domain/layout/top-bar/entities/layout-top-bar-config-entity';
import { LayoutTopBarMessage } from '../../../../../domain/layout/top-bar/entities/layout-top-bar-message-entity';
import { ILayoutTopBarConfigRepository } from '../../../../../domain/layout/top-bar/repositories/layout-top-bar-config-repository';
import { UpdateLayoutTopBarConfigRequestDTO } from '../../../../../infra/layout/top-bar/dtos/admin/update-layout-top-bar-config-request-dto';
import { LayoutTopBarConfigResponseDTO } from '../../../../../infra/layout/top-bar/dtos/shared/layout-top-bar-config-response-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../../infra/shared/http/response/http-status';

export class UpdateLayoutTopBarConfigUseCase {
  constructor(private readonly layoutTopBarConfigRepository: ILayoutTopBarConfigRepository) {}

  public async execute(
    layoutTopBarConfigId: string,
    data: UpdateLayoutTopBarConfigRequestDTO,
  ): Promise<LayoutTopBarConfigResponseDTO> {
    const topBarConfig = await this.layoutTopBarConfigRepository.findById(layoutTopBarConfigId);

    if (!topBarConfig) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Configuration not found');
    }

    if (!topBarConfig.active) {
      throw new HttpException(HttpStatus.BAD_REQUEST, 'This configuration is not active');
    }

    const updateData: Partial<LayoutTopBarConfig> = {
      ...data,
      layoutTopBarMessages: undefined,
    };

    const layoutTopBarMessages = data.layoutTopBarMessages?.map((message, index) =>
      LayoutTopBarMessage.create({
        ...message,
        layoutTopBarConfigId: layoutTopBarConfigId,
        position: index + 1,
      }),
    );

    if (Array.isArray(layoutTopBarMessages)) {
      updateData.layoutTopBarMessages = layoutTopBarMessages;
    }

    const updatedTopBarConfig = await this.layoutTopBarConfigRepository.update(layoutTopBarConfigId, {
      ...data,
      layoutTopBarMessages,
    });

    return LayoutTopBarConfigResponseDTO.create(updatedTopBarConfig);
  }
}
