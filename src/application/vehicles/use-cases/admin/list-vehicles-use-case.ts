import { IVehicleRepository } from '../../../../domain/vehicles/repositories/vehicle-repository';
import { Paginated } from '../../../../infra/shared/types/generic';
import { ListVehiclesRequestDTO } from '../../../../infra/vehicles/dtos/admin/list-vehicles-request-dto';
import { VehicleResponseDTO } from '../../../../infra/vehicles/dtos/shared/vehicle-response-dto';

export class ListVehiclesUseCase {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  public async execute(data: ListVehiclesRequestDTO): Promise<Paginated<VehicleResponseDTO>> {
    const vehicles = await this.vehicleRepository.list(data);

    return {
      ...vehicles,
      items: vehicles.items.map(VehicleResponseDTO.create),
    };
  }
}
