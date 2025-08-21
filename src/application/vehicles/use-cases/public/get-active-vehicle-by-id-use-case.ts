import { IVehicleRepository } from '../../../../domain/vehicles/repositories/vehicle-repository';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { VehicleResponseDTO } from '../../../../infra/vehicles/dtos/shared/vehicle-response-dto';

export class GetActiveVehicleByIdUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(vehicleId: string): Promise<VehicleResponseDTO> {
    const vehicle = await this.vehicleRepository.findById(vehicleId);

    if (!vehicle || !vehicle.active) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Vehicle not found');
    }

    return VehicleResponseDTO.create(vehicle);
  }
}
