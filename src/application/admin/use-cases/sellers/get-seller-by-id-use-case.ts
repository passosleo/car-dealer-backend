import { ISellerRepository } from '../../../../domain/admin/repositories/seller-repository';
import { SellerResponseDTO } from '../../../../infra/admin/http/dtos/sellers/seller-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetSellerByIdUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(sellerId: string): Promise<SellerResponseDTO> {
    const seller = await this.sellerRepository.findById(sellerId);
    if (!seller) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Seller not found');
    }
    return SellerResponseDTO.create(seller);
  }
}
