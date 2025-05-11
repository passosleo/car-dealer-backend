import { faker } from '@faker-js/faker';
import { CreateSessionUseCase } from '../create-session-use-case';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { TokenServiceMock } from '../../../../../test/shared/services/token-service-mock';
import { HashServiceMock } from '../../../../../test/shared/services/hash-service-mock';
import { CreateSessionRequestDTO } from '../../../../../infra/auth/admin/dtos/admin/create-session-request-dto';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';

describe('CreateSessionUseCase', () => {
  let sut: CreateSessionUseCase;

  beforeEach(() => {
    sut = new CreateSessionUseCase(UserRepositoryMock, TokenServiceMock, HashServiceMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when user does not exists', async () => {
    // Arrange
    const request = CreateSessionRequestDTO.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });

    UserRepositoryMock.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
    expect(HashServiceMock.compare).not.toHaveBeenCalled();
    expect(TokenServiceMock.generateAccessToken).not.toHaveBeenCalled();
    expect(TokenServiceMock.generateRefreshToken).not.toHaveBeenCalled();
  });

  it('should throw a unauthorized exception when user password does not match', async () => {
    // Arrange
    const request = CreateSessionRequestDTO.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const userExists = UserMockFactory.createEntity();
    UserRepositoryMock.findByEmail.mockResolvedValue(userExists);
    HashServiceMock.compare.mockResolvedValue(false);
    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);
    // Assert
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
    expect(HashServiceMock.compare).toHaveBeenCalledTimes(1);
    expect(HashServiceMock.compare).toHaveBeenCalledWith(request.password, userExists.password);
    expect(TokenServiceMock.generateAccessToken).not.toHaveBeenCalled();
    expect(TokenServiceMock.generateRefreshToken).not.toHaveBeenCalled();
  });

  it('should return a new session when user password match', async () => {
    // Arrange
    const request = CreateSessionRequestDTO.create({
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
    const userExists = UserMockFactory.createEntity();
    UserRepositoryMock.findByEmail.mockResolvedValue(userExists);
    HashServiceMock.compare.mockResolvedValue(true);
    TokenServiceMock.generateAccessToken.mockReturnValue(faker.string.uuid());
    TokenServiceMock.generateRefreshToken.mockReturnValue(faker.string.uuid());

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(result).toBeDefined();
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(result.accessTokenExpiresIn).toBeDefined();
    expect(result.refreshTokenExpiresIn).toBeDefined();

    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
    expect(HashServiceMock.compare).toHaveBeenCalledTimes(1);
    expect(HashServiceMock.compare).toHaveBeenCalledWith(request.password, userExists.password);
    expect(TokenServiceMock.generateAccessToken).toHaveBeenCalledTimes(1);
    expect(TokenServiceMock.generateAccessToken).toHaveBeenCalledWith({ id: userExists.userId });
    expect(TokenServiceMock.generateRefreshToken).toHaveBeenCalledTimes(1);
    expect(TokenServiceMock.generateRefreshToken).toHaveBeenCalledWith({ id: userExists.userId });
  });
});
