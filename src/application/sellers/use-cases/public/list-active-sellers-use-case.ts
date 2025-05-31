import { Paginated } from '../../../../infra/shared/types/generic';
import { ISellerRepository } from '../../../../domain/sellers/repositories/seller-repository';
import { SellerResponseDTO } from '../../../../infra/sellers/dtos/shared/seller-response-dto';
import { ListActiveSellersRequestDTO } from '../../../../infra/sellers/dtos/public/list-active-sellers-request-dto';

export class ListActiveSellersUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(data: ListActiveSellersRequestDTO): Promise<Paginated<SellerResponseDTO>> {
    const sellers = await this.sellerRepository.list({
      ...data,
      status: 'active',
    });
    return {
      ...sellers,
      items: sellers.items.map(SellerResponseDTO.create),
    };
  }
}
