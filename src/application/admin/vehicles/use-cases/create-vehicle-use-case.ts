import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';
import { Vehicle } from '../../../../domain/admin/vehicles/entities/vehicle-entity';
import { IVehicleRepository } from '../../../../domain/admin/vehicles/repositories/vehicle-repository';
import { CreateVehicleRequestDTO } from '../../../../infra/admin/vehicles/http/dtos/create-vehicle-request-dto';
import { VehicleResponseDTO } from '../../../../infra/admin/vehicles/http/dtos/vehicle-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateVehicleUseCase {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly brandRepository: IBrandRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({ vehicleImages, ...data }: CreateVehicleRequestDTO): Promise<VehicleResponseDTO> {
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
