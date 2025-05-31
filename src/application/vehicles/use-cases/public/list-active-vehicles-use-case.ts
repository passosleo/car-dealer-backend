import { IVehicleRepository } from '../../../../domain/vehicles/repositories/vehicle-repository';
import { Paginated } from '../../../../infra/shared/types/generic';
import { ListActiveVehiclesRequestDTO } from '../../../../infra/vehicles/dtos/public/list-active-vehicles-request-dto';
import { VehicleResponseDTO } from '../../../../infra/vehicles/dtos/shared/vehicle-response-dto';

export class ListActiveVehiclesUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(data: ListActiveVehiclesRequestDTO): Promise<Paginated<VehicleResponseDTO>> {
    const vehicles = await this.vehicleRepository.list({
      ...data,
      status: 'active',
    });
    return {
      ...vehicles,
      items: vehicles.items.map(VehicleResponseDTO.create),
    };
  }
}
