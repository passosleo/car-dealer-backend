import { Category } from '../../../../domain/categories/entities/category-entity';
import { ICategoryRepository } from '../../../../domain/categories/repositories/category-repository';
import { UpdateCategoryRequestDTO } from '../../../../infra/categories/dtos/admin/update-category-request-dto';
import { CategoryResponseDTO } from '../../../../infra/categories/dtos/shared/category-response-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class UpdateCategoryUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute(categoryId: string, { image, ...data }: UpdateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    const categoryExists = await this.categoryRepository.findById(categoryId);

    if (!categoryExists) {
      throw new HttpException(HttpStatus.NOT_FOUND, 'Category not found');
    }

    const categoryWithSameNameExists = await this.categoryRepository.findByName(data.name);

    if (categoryWithSameNameExists && categoryWithSameNameExists.categoryId !== categoryId) {
      throw new HttpException(HttpStatus.CONFLICT, 'Category with same name already exists');
    }

    const imageUrl = await this.getImageUpdatePromise(image, categoryExists.imageUrl);

    const updateCategoryData: Partial<Category> = {
      ...data,
      imageUrl,
    };

    const category = await this.categoryRepository.update(categoryId, updateCategoryData);

    return CategoryResponseDTO.create(category);
  }

  private async getImageUpdatePromise(newImage: string, currentImage: string) {
    if (StringHelper.isBase64Image(newImage)) {
      return this.imageStorage.updateImageBase64(currentImage, newImage);
    }
    return Promise.resolve(currentImage);
  }
}
