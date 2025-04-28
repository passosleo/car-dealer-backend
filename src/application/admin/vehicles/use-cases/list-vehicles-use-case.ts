import { IVehicleRepository } from '../../../../domain/admin/vehicles/repositories/vehicle-repository';
import { ListVehiclesRequestDTO } from '../../../../infra/admin/vehicles/http/dtos/list-vehicles-request-dto';
import { VehicleResponseDTO } from '../../../../infra/admin/vehicles/http/dtos/vehicle-response-dto';
import { Paginated } from '../../../../infra/shared/types/generic';

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
