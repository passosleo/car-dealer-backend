import { IBrandRepository } from '../../../../domain/brands/repositories/brand-repository';
import { ICategoryRepository } from '../../../../domain/categories/repositories/category-repository';
import { Vehicle } from '../../../../domain/vehicles/entities/vehicle-entity';
import { IVehicleRepository } from '../../../../domain/vehicles/repositories/vehicle-repository';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { CreateVehicleRequestDTO } from '../../../../infra/vehicles/dtos/admin/create-vehicle-request-dto';
import { VehicleResponseDTO } from '../../../../infra/vehicles/dtos/shared/vehicle-response-dto';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateVehicleUseCase {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly brandRepository: IBrandRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({ vehicleImages, ...data }: CreateVehicleRequestDTO): Promise<VehicleResponseDTO> {
    if (!vehicleImages || vehicleImages.length === 0) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'Vehicle images are required');
    }

    const [category, brand, vehicleWithSamePlateExists] = await Promise.all([
      this.categoryRepository.findById(data.categoryId),
      this.brandRepository.findById(data.brandId),
      this.vehicleRepository.findByPlate(data.plate),
    ]);

    if (vehicleWithSamePlateExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'A vehicle with the same plate already exists');
    }

    if (!category) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The category does not exist');
    }

    if (!brand) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The brand does not exist');
    }

    const isAllImagesValid = vehicleImages.every(StringHelper.isBase64Image);

    if (!isAllImagesValid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'Some images are not valid');
    }

    const vehicleImagesUrls = await Promise.all(
      vehicleImages.map((image) => this.imageStorage.uploadImageBase64(image)),
    );

    const newVehicle = Vehicle.create({
      ...data,
      brand,
      category,
      vehicleImages: vehicleImagesUrls,
    });

    const vehicle = await this.vehicleRepository.create(newVehicle);

    return VehicleResponseDTO.create(vehicle);
  }
}
