import { ISellerRepository } from '../../../../domain/admin/repositories/seller-repository';
import { SellerResponseDTO } from '../../../../infra/admin/http/dtos/sellers/seller-response-dto';
import { UpdateSellerRequestDTO } from '../../../../infra/admin/http/dtos/sellers/update-sellet-request-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class UpdateSellerUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(bannerId: string, data: UpdateSellerRequestDTO): Promise<SellerResponseDTO> {
    const sellerExists = await this.sellerRepository.findById(bannerId);
    if (!sellerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Seller not found');
    }
    const seller = await this.sellerRepository.update(bannerId, data);
    return SellerResponseDTO.create(seller);
  }
}
