import { Seller } from '../../../../domain/admin/entities/seller-entity';
import { ISellerRepository } from '../../../../domain/admin/repositories/seller-repository';
import { CreateSellerRequestDTO } from '../../../../infra/admin/http/dtos/sellers/create-seller-request-dto';
import { SellerResponseDTO } from '../../../../infra/admin/http/dtos/sellers/seller-response-dto';

export class CreateSellerUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(data: CreateSellerRequestDTO): Promise<SellerResponseDTO> {
    const seller = await this.sellerRepository.create(Seller.create(data));
    return SellerResponseDTO.create(seller);
  }
}
