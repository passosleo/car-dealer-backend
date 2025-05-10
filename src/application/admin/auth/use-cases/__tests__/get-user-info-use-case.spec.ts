import { UserMockFactory } from '../../../../../test/admin/factories/user-mock-factory';
import { GetUserInfoUseCase } from '../get-user-info-use-case';
import { AuthProviderMock } from '../../../../../test/admin/providers/auth-provider-mock';
import { UserAccountDTO } from '../../../../../domain/admin/users/dtos/user-account-dto';

describe('GetUserInfoUseCase', () => {
  let sut: GetUserInfoUseCase;

  beforeEach(() => {
    sut = new GetUserInfoUseCase(AuthProviderMock);
    jest.clearAllMocks();
  });

  it('should return user info', async () => {
    // Arrange
    const user = UserMockFactory.createEntity();
    const userInfo = UserAccountDTO.create(user);
    AuthProviderMock.getAuthenticatedUser.mockReturnValue(userInfo);

    // Act
    const result = await sut.execute();

    // Assert
    expect(AuthProviderMock.getAuthenticatedUser).toHaveBeenCalled();
    expect(result).toEqual(
      expect.objectContaining({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        active: user.active,
        profile: {
          name: user.profile.name,
          roles: user.profile.roles.map((role) => role.name),
        },
      }),
    );
  });
});
