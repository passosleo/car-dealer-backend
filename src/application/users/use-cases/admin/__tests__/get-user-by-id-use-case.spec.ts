import { faker } from '@faker-js/faker';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { GetUserByIdUseCase } from '../get-user-by-id-use-case';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';
import { UserResponseDTO } from '../../../../../infra/users/dtos/admin/user-response-dto';

describe('GetUserByIdUseCase', () => {
  let sut: GetUserByIdUseCase;

  beforeEach(() => {
    sut = new GetUserByIdUseCase(UserRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when user does not exists', async () => {
    // Arrange
    const userId = faker.string.uuid();

    UserRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(userId)).rejects.toThrow(HttpException);

    // Assert
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
  });

  it('should return a user by id successfully', async () => {
    // Arrange
    const userId = faker.string.uuid();
    const userExists = UserMockFactory.createEntity();

    UserRepositoryMock.findById.mockResolvedValueOnce(userExists);

    // Act
    const result = await sut.execute(userId);

    // Assert
    expect(result).toEqual(
      expect.objectContaining<UserResponseDTO>({
        userId: userExists.userId,
        firstName: userExists.firstName,
        lastName: userExists.lastName,
        email: userExists.email,
        active: userExists.active,
        profile: userExists.profile,
        createdAt: userExists.createdAt,
        updatedAt: userExists.updatedAt,
        passwordChangedAt: userExists.passwordChangedAt,
      }),
    );
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(userId);
  });
});
