import { TopBarMessage } from '../../../../../domain/layout/topbar/entities/top-bar-message-entity';
import { ITopBarMessageRepository } from '../../../../../domain/layout/topbar/repositories/topbar-message-repository';
import { CreateTopBarMessageRequestDTO } from '../../../../../infra/layout/topbar/dtos/admin/create-topbar-message-request-dto';
import { TopBarMessageResponseDTO } from '../../../../../infra/layout/topbar/dtos/shared/topbar-message-response-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../../infra/shared/http/response/http-status';

export class CreateTopBarMessageUseCase {
  constructor(private readonly topBarMessageRepository: ITopBarMessageRepository) {}

  public async execute(data: CreateTopBarMessageRequestDTO): Promise<TopBarMessageResponseDTO> {
    const topBarMessageExists = await this.topBarMessageRepository.findByMessage(data.message);

    if (topBarMessageExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'A top bar message with this text already exists');
    }

    const newTopBarMessage = TopBarMessage.create(data);

    const topBarMessage = await this.topBarMessageRepository.create(newTopBarMessage);

    return TopBarMessageResponseDTO.create(topBarMessage);
  }
}
