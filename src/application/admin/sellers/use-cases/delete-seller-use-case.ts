import { ISellerRepository } from '../../../../domain/admin/sellers/repositories/seller-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class DeleteSellerUseCase {
  constructor(private readonly sellerRepository: ISellerRepository) {}

  public async execute(sellerId: string): Promise<void> {
    const sellerExists = await this.sellerRepository.findById(sellerId);
    if (!sellerExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Seller not found');
    }
    await this.sellerRepository.delete(sellerId);
  }
}
