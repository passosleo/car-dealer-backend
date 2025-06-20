import { TopBarMessage } from '../../../../../domain/layout/topbar/entities/top-bar-message-entity';
import { ITopBarMessageRepository } from '../../../../../domain/layout/topbar/repositories/topbar-message-repository';
import { CreateTopBarMessageRequestDTO } from '../../../../../infra/layout/topbar/dtos/admin/create-topbar-message-request-dto';
import { TopBarMessageResponseDTO } from '../../../../../infra/layout/topbar/dtos/shared/topbar-message-response-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../../infra/shared/http/response/http-status';

export class CreateManyTopBarMessagesUseCase {
  constructor(private readonly topBarMessageRepository: ITopBarMessageRepository) {}

  public async execute(data: CreateTopBarMessageRequestDTO[]): Promise<TopBarMessageResponseDTO[]> {
    const topBarMessageExists = await this.topBarMessageRepository.findByMessages(data.map((msg) => msg.message));

    if (topBarMessageExists.length > 0) {
      throw new HttpException(HttpStatus.CONFLICT, 'Some top bar messages with these texts already exist');
    }

    const newTopBarMessages = data.map(TopBarMessage.create);

    const topBarMessages = await this.topBarMessageRepository.createMany(newTopBarMessages);

    return topBarMessages.map(TopBarMessageResponseDTO.create);
  }
}
