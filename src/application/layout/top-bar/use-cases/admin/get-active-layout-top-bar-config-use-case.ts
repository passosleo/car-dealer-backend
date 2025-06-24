import { ILayoutTopBarConfigRepository } from '../../../../../domain/layout/top-bar/repositories/layout-top-bar-config-repository';
import { LayoutTopBarConfigResponseDTO } from '../../../../../infra/layout/top-bar/dtos/shared/layout-top-bar-config-response-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../../infra/shared/http/response/http-status';

export class GetActiveLayoutTopBarConfigUseCase {
  constructor(private readonly layoutTopBarConfigRepository: ILayoutTopBarConfigRepository) {}

  public async execute(): Promise<LayoutTopBarConfigResponseDTO> {
    const activeTopBarConfig = await this.layoutTopBarConfigRepository.list({
      status: 'active',
      orderBy: 'desc',
      limit: 1,
    });
    if (!activeTopBarConfig.items || activeTopBarConfig.items.length === 0) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'No active layout top bar configuration found');
    }
    return LayoutTopBarConfigResponseDTO.create(activeTopBarConfig.items[0]);
  }
}
