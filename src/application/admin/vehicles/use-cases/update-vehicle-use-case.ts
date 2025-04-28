import { IBrandRepository } from '../../../../domain/admin/brands/repositories/brand-repository';
import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';
import { Vehicle } from '../../../../domain/admin/vehicles/entities/vehicle-entity';
import { IVehicleRepository } from '../../../../domain/admin/vehicles/repositories/vehicle-repository';
import { UpdateVehicleRequestDTO } from '../../../../infra/admin/vehicles/http/dtos/update-vehicle-request-dto';
import { VehicleResponseDTO } from '../../../../infra/admin/vehicles/http/dtos/vehicle-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class UpdateVehicleUseCase {
  constructor(
    private readonly vehicleRepository: IVehicleRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly brandRepository: IBrandRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(
    vehicleId: string,
    { vehicleImages, ...data }: UpdateVehicleRequestDTO,
  ): Promise<VehicleResponseDTO> {
    const vehicleExists = await this.vehicleRepository.findById(vehicleId);

    if (!vehicleExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Vehicle not found');
    }

    const updateVehicleData: Partial<Vehicle> = {
      ...data,
    };

    const hasNewPlate = data.plate !== vehicleExists.plate;
    const hasNewCategory = data.categoryId !== vehicleExists.category.categoryId;
    const hasNewBrand = data.brandId !== vehicleExists.brand.brandId;

    if (hasNewPlate) {
      const vehicleWithSamePlateExists = await this.vehicleRepository.findByPlate(data.plate);
      if (vehicleWithSamePlateExists) {
        throw new HttpException(HttpStatus.CONFLICT, 'A vehicle with the same plate already exists');
      }
    }

    if (hasNewCategory) {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category) {
        throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The category does not exist');
      }
      updateVehicleData.category = category;
    }

    if (hasNewBrand) {
      const brand = await this.brandRepository.findById(data.brandId);
      if (!brand) {
        throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The brand does not exist');
      }
      updateVehicleData.brand = brand;
    }

    const vehicleImageUrls = await this.getImageUpdatePromises(vehicleImages, vehicleExists.vehicleImages);
    updateVehicleData.vehicleImages = vehicleImageUrls;

    const vehicle = await this.vehicleRepository.update(vehicleId, updateVehicleData);

    return VehicleResponseDTO.create(vehicle);
  }

  private async getImageUpdatePromises(newImages: string[], currentImages: string[]) {
    const imageUpdatePromises = newImages.map((newImage, index) => {
      if (StringHelper.isBase64Image(newImage)) {
        return this.imageStorage.updateImageBase64(currentImages[index], newImage);
      }
      return Promise.resolve(null);
    });
    return Promise.all(imageUpdatePromises).then((urls) => urls.filter((url) => url !== null));
  }
}
