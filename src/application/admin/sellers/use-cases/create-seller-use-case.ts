import { Seller } from '../../../../domain/admin/sellers/entities/seller-entity';
import { ISellerRepository } from '../../../../domain/admin/sellers/repositories/seller-repository';
import { CreateSellerRequestDTO } from '../../../../infra/admin/sellers/http/dtos/create-seller-request-dto';
import { SellerResponseDTO } from '../../../../infra/admin/sellers/http/dtos/seller-response-dto';

export class CreateSellerUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(data: CreateSellerRequestDTO): Promise<SellerResponseDTO> {
    const seller = await this.sellerRepository.create(Seller.create(data));
    return SellerResponseDTO.create(seller);
  }
}
