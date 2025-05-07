import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { BrandMockFactory } from '../../../../../test/admin/factories/brand-mock-factory';
import { BrandRepositoryMock } from '../../../../../test/admin/repositories/brand-repository-mock';
import { GetBrandByIdUseCase } from '../get-brand-by-id-use-case';

describe('GetBrandByIdUseCase', () => {
  let sut: GetBrandByIdUseCase;

  beforeEach(() => {
    sut = new GetBrandByIdUseCase(BrandRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when brand does not exists', async () => {
    // Arrange
    const brandId = faker.string.uuid();

    BrandRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(brandId)).rejects.toThrow(HttpException);

    // Assert
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
  });

  it('should return a brand by id successfully', async () => {
    // Arrange
    const brandId = faker.string.uuid();
    const brandExists = BrandMockFactory.createEntity();

    BrandRepositoryMock.findById.mockResolvedValueOnce(brandExists);

    // Act
    const result = await sut.execute(brandId);

    // Assert
    expect(result).toEqual(brandExists);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(BrandRepositoryMock.findById).toHaveBeenCalledWith(brandId);
  });
});
