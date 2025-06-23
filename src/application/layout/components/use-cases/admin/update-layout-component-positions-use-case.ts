import { LayoutComponent } from '../../../../../domain/layout/components/entities/layout-component-entity';
import { ILayoutComponentRepository } from '../../../../../domain/layout/components/repositories/layout-component-repository';
import { UpdateLayoutComponentPositionsRequestDTO } from '../../../../../infra/layout/components/dtos/admin/update-layout-component-positions-dto';
import { LayoutComponentResponseDTO } from '../../../../../infra/layout/components/dtos/shared/layout-component-response-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../../infra/shared/http/response/http-status';

export class UpdateLayoutComponentPositionsUseCase {
  constructor(private readonly layoutComponentRepository: ILayoutComponentRepository) {}

  public async execute(
    page: string,
    data: UpdateLayoutComponentPositionsRequestDTO[],
  ): Promise<LayoutComponentResponseDTO[]> {
    const existingIds = (await this.layoutComponentRepository.findAllByPage(page)).map(
      (component) => component.layoutComponentId,
    );
    const receivedIds = data.map((item) => item.layoutComponentId);

    const validation = this.validateIdSet({ existingIds, receivedIds });

    if (!validation.valid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, validation.error!);
    }

    const updates = new Map<string, Partial<LayoutComponent>>();
    data.forEach((item, index) => {
      updates.set(item.layoutComponentId, { position: index + 1 });
    });

    const updatedComponents = await this.layoutComponentRepository.updateMany(updates);

    return updatedComponents.map(LayoutComponentResponseDTO.create);
  }

  private validateIdSet({ existingIds, receivedIds }: { existingIds: string[]; receivedIds: string[] }) {
    const hasDuplicates = new Set(receivedIds).size !== receivedIds.length;
    if (hasDuplicates) {
      return { valid: false, error: 'There are duplicate IDs in the received data.' };
    }

    const missingIds = existingIds.filter((id) => !receivedIds.includes(id));
    if (missingIds.length > 0) {
      return { valid: false, error: `Missing IDs: ${missingIds.join(', ')}` };
    }

    const extraIds = receivedIds.filter((id) => !existingIds.includes(id));
    if (extraIds.length > 0) {
      return { valid: false, error: `More IDs received than expected: ${extraIds.join(', ')}` };
    }

    return { valid: true };
  }
}
