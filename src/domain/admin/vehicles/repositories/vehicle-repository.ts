import { Paginated } from '../../../../infra/shared/types/generic';
import { Vehicle } from '../entities/vehicle-entity';

export type ListVehiclesParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
  priceStart?: number;
  priceEnd?: number;
  mileageStart?: number;
  mileageEnd?: number;
  yearStart?: number;
  yearEnd?: number;
  doors?: number;
  seats?: number;
  horsepowerStart?: number;
  horsepowerEnd?: number;
};

export interface IVehicleRepository {
  create(data: Vehicle): Promise<Vehicle>;
  update(id: string, data: Partial<Vehicle>): Promise<Vehicle>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Vehicle | null>;
  list(data: ListVehiclesParams): Promise<Paginated<Vehicle>>;
}
