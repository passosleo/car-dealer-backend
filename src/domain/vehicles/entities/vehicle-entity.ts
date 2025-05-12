import { Brand } from '../../brands/entities/brand-entity';
import { Category } from '../../categories/entities/category-entity';

export interface CreateVehicleData {
  vehicleId?: string;
  model: string;
  year: number;
  plate: string;
  description?: string | null;
  price?: number | null;
  mileage?: number | null;
  color?: string | null;
  transmission?: string | null;
  fuelType?: string | null;
  doors?: number | null;
  seats?: number | null;
  horsepower?: number | null;
  torque?: number | null;
  driveTrain?: string | null;
  brand: Brand;
  category: Category;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  vehicleImages: string[];
  vehicleFeatures: string[];
}

export class Vehicle {
  public readonly vehicleId: string;
  public model: string;
  public year: number;
  public plate: string;
  public description: string | null;
  public price: number | null;
  public mileage: number | null;
  public color: string | null;
  public transmission: string | null;
  public fuelType: string | null;
  public doors: number | null;
  public seats: number | null;
  public horsepower: number | null;
  public torque: number | null;
  public driveTrain: string | null;
  public brand: Brand;
  public category: Category;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public vehicleImages: string[];
  public vehicleFeatures: string[];

  public constructor(data: CreateVehicleData) {
    this.vehicleId = data.vehicleId!;
    this.model = data.model;
    this.year = data.year;
    this.plate = data.plate;
    this.description = data.description ?? null;
    this.price = data.price ?? null;
    this.mileage = data.mileage ?? null;
    this.color = data.color ?? null;
    this.transmission = data.transmission ?? null;
    this.fuelType = data.fuelType ?? null;
    this.doors = data.doors ?? null;
    this.seats = data.seats ?? null;
    this.horsepower = data.horsepower ?? null;
    this.torque = data.torque ?? null;
    this.driveTrain = data.driveTrain ?? null;
    this.brand = data.brand;
    this.category = data.category;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.vehicleImages = data.vehicleImages || [];
    this.vehicleFeatures = data.vehicleFeatures || [];
  }

  public static create(data: CreateVehicleData): Vehicle {
    return new Vehicle(data);
  }
}
