import { ISellerRepository } from '../../../../domain/admin/repositories/seller-repository';
import { ListSellersRequestDTO } from '../../../../infra/admin/http/dtos/sellers/list-sellers-request-dto';
import { SellerResponseDTO } from '../../../../infra/admin/http/dtos/sellers/seller-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

export class ListSellersUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(data: ListSellersRequestDTO): Promise<Paginated<SellerResponseDTO>> {
    const sellers = await this.sellerRepository.list(data);
    return {
      ...sellers,
      items: sellers.items.map(SellerResponseDTO.create),
    };
  }
}
