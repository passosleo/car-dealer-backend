import { faker } from '@faker-js/faker';
import { UserRepositoryMock } from '../../../../../test/users/user-repository-mock';
import { RefreshSessionUseCase } from '../refresh-session-use-case';
import { TokenServiceMock } from '../../../../../test/shared/services/token-service-mock';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { UserMockFactory } from '../../../../../test/users/user-mock-factory';
import { RefreshSessionRequestDTO } from '../../../../../infra/auth/dtos/admin/refresh-session-request-dto';

describe('RefreshSessionUseCase', () => {
  let sut: RefreshSessionUseCase;

  beforeEach(() => {
    sut = new RefreshSessionUseCase(UserRepositoryMock, TokenServiceMock);
    jest.clearAllMocks();
  });

  it('should throw a not found exception when user does not exists', async () => {
    // Arrange
    const request = RefreshSessionRequestDTO.create({
      refreshToken: faker.string.uuid(),
    });
    const refreshTokenPayload = { id: faker.string.uuid() };
    TokenServiceMock.verifyRefreshToken.mockReturnValue(refreshTokenPayload);

    UserRepositoryMock.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(TokenServiceMock.verifyRefreshToken).toHaveBeenCalledWith(request.refreshToken);
    expect(TokenServiceMock.verifyRefreshToken).toHaveBeenCalledTimes(1);
    expect(UserRepositoryMock.findById).toHaveBeenCalledWith(refreshTokenPayload.id);
    expect(UserRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(TokenServiceMock.generateAccessToken).not.toHaveBeenCalled();
    expect(TokenServiceMock.generateRefreshToken).not.toHaveBeenCalled();
  });

  it('should return a new session when user exists', async () => {
    // Arrange
    const request = RefreshSessionRequestDTO.create({
      refreshToken: faker.string.uuid(),
    });

    const userExists = UserMockFactory.createEntity();
    const refreshTokenPayload = { id: userExists.userId };
    TokenServiceMock.verifyRefreshToken.mockReturnValue(refreshTokenPayload);

    UserRepositoryMock.findById.mockResolvedValue(userExists);

    const accessToken = faker.string.uuid();
    const refreshToken = faker.string.uuid();
    TokenServiceMock.generateAccessToken.mockReturnValue(accessToken);
    TokenServiceMock.generateRefreshToken.mockReturnValue(refreshToken);

    // Act
    const result = await sut.execute(request);

    // Assert
    expect(result).toEqual({
      type: 'Bearer',
      accessToken,
      accessTokenExpiresIn: expect.any(Number),
      refreshToken,
      refreshTokenExpiresIn: expect.any(Number),
    });
  });
});
