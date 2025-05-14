import { IVehicleRepository } from '../../../../domain/vehicles/repositories/vehicle-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class DeleteVehicleUseCase {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(vehicleId: string): Promise<void> {
    const vehicleExists = await this.vehicleRepository.findById(vehicleId);

    if (!vehicleExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Vehicle not found');
    }

    await Promise.all([
      ...vehicleExists.vehicleImages.map((image) => this.imageStorage.deleteImage(image)),
      this.vehicleRepository.delete(vehicleId),
    ]);
  }
}
