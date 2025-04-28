import { IVehicleRepository } from '../../../../domain/admin/vehicles/repositories/vehicle-repository';
import { VehicleResponseDTO } from '../../../../infra/admin/vehicles/http/dtos/vehicle-response-dto';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';

export class GetVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(vehicleId: string): Promise<VehicleResponseDTO> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Vehicle not found');
    }

    return VehicleResponseDTO.create(vehicle);
  }
}
