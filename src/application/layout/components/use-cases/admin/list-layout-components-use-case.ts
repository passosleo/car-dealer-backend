import { ILayoutComponentRepository } from '../../../../../domain/layout/components/repositories/layout-component-repository';
import { LayoutComponentResponseDTO } from '../../../../../infra/layout/components/dtos/shared/layout-component-response-dto';

export class ListLayoutComponentsUseCase {
  constructor(private readonly layoutComponentRepository: ILayoutComponentRepository) {}

  public async execute(): Promise<LayoutComponentResponseDTO[]> {
    return await this.layoutComponentRepository.findAll();
  }
}
