import { Category } from '../../../../domain/admin/categories/entities/category-entity';
import { ICategoryRepository } from '../../../../domain/admin/categories/repositories/category-repository';
import { CategoryResponseDTO } from '../../../../infra/admin/categories/http/dtos/category-response-dto';
import { CreateCategoryRequestDTO } from '../../../../infra/admin/categories/http/dtos/create-category-request-dto';
import { StringHelper } from '../../../../infra/shared/helpers/string-helper';
import { HttpException } from '../../../../infra/shared/http/response/http-exception';
import { HttpStatus } from '../../../../infra/shared/http/response/http-status';
import { IImageStorage } from '../../../shared/storages/image-storage';

export class CreateCategoryUseCase {
  constructor(
    private readonly categoryRepository: ICategoryRepository,
    private readonly imageStorage: IImageStorage,
  ) {}

  public async execute({ image, ...data }: CreateCategoryRequestDTO): Promise<CategoryResponseDTO> {
    const isImageValid = StringHelper.isBase64Image(image);

    if (!isImageValid) {
      throw new HttpException(HttpStatus.UNPROCESSABLE_ENTITY, 'The image must be in base64 format');
    }

    const categoryExists = await this.categoryRepository.findByName(data.name);

    if (categoryExists) {
      throw new HttpException(HttpStatus.CONFLICT, 'Category already exists');
    }

    const imageUrl = await this.imageStorage.uploadImageBase64(image);

    const newCategory = Category.create({
      ...data,
      imageUrl,
    });

    const category = await this.categoryRepository.create(newCategory);

    return CategoryResponseDTO.create(category);
  }
}
