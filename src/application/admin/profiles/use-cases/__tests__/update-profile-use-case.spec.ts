import { faker } from '@faker-js/faker';
import { UpdateProfileUseCase } from '../update-profile-use-case';
import { ProfileRepositoryMock } from '../../../../../test/admin/repositories/profile-repository-mock';
import { RoleRepositoryMock } from '../../../../../test/admin/repositories/role-repository-mock';
import { UpdateProfileRequestDTO } from '../../../../../infra/admin/profiles/http/dtos/update-profile-request-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ProfileMockFactory } from '../../../../../test/admin/factories/profile-mock-factory';
import { RoleMockFactory } from '../../../../../test/admin/factories/role-mock-factory';

describe('UpdateProfileUseCase', () => {
  let sut: UpdateProfileUseCase;

  beforeEach(() => {
    sut = new UpdateProfileUseCase(ProfileRepositoryMock, RoleRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw unprocessable entity when roles list is empty', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const request = UpdateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [],
    });

    // Act & Assert
    await expect(sut.execute(profileId, request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findByName).not.toHaveBeenCalled();
    expect(ProfileRepositoryMock.findById).not.toHaveBeenCalled();
    expect(RoleRepositoryMock.findByIds).not.toHaveBeenCalled();
    expect(ProfileRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw conflict when another profile with same name exists', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const request = UpdateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [{ roleId: faker.string.uuid() }],
    });

    const existingProfile = ProfileMockFactory.createEntity({ name: request.name });
    ProfileRepositoryMock.findByName.mockResolvedValueOnce(existingProfile);

    // Act & Assert
    await expect(sut.execute(profileId, request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ProfileRepositoryMock.findById).not.toHaveBeenCalled();
    expect(RoleRepositoryMock.findByIds).not.toHaveBeenCalled();
    expect(ProfileRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw not found when profile does not exist', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const request = UpdateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [{ roleId: faker.string.uuid() }],
    });

    ProfileRepositoryMock.findByName.mockResolvedValueOnce(null);
    ProfileRepositoryMock.findById.mockResolvedValueOnce(null);

    // Act & Assert
    await expect(sut.execute(profileId, request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(profileId);
    expect(RoleRepositoryMock.findByIds).not.toHaveBeenCalled();
    expect(ProfileRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should throw unprocessable entity when some roles are invalid', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const request = UpdateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [{ roleId: faker.string.uuid() }, { roleId: faker.string.uuid() }],
    });

    const profile = ProfileMockFactory.createEntity({ profileId });
    const validRole = RoleMockFactory.createEntity({ roleId: request.roles[0].roleId });

    ProfileRepositoryMock.findByName.mockResolvedValueOnce(null);
    ProfileRepositoryMock.findById.mockResolvedValueOnce(profile);
    RoleRepositoryMock.findByIds.mockResolvedValueOnce([validRole]);

    // Act & Assert
    await expect(sut.execute(profileId, request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(profileId);
    expect(RoleRepositoryMock.findByIds).toHaveBeenCalledWith(request.roles.map((r) => r.roleId));
    expect(ProfileRepositoryMock.update).not.toHaveBeenCalled();
  });

  it('should update profile successfully', async () => {
    // Arrange
    const profileId = faker.string.uuid();
    const request = UpdateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [{ roleId: faker.string.uuid() }, { roleId: faker.string.uuid() }],
    });

    const profile = ProfileMockFactory.createEntity({ profileId });
    const roles = request.roles.map((role) => RoleMockFactory.createEntity({ roleId: role.roleId }));
    const updatedProfile = ProfileMockFactory.createEntity({
      profileId,
      name: request.name,
      roles,
    });

    ProfileRepositoryMock.findByName.mockResolvedValueOnce(null);
    ProfileRepositoryMock.findById.mockResolvedValueOnce(profile);
    RoleRepositoryMock.findByIds.mockResolvedValueOnce(roles);
    ProfileRepositoryMock.update.mockResolvedValueOnce(updatedProfile);

    // Act
    const result = await sut.execute(profileId, request);

    // Assert
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(ProfileRepositoryMock.findById).toHaveBeenCalledWith(profileId);
    expect(RoleRepositoryMock.findByIds).toHaveBeenCalledWith(request.roles.map((r) => r.roleId));
    expect(ProfileRepositoryMock.update).toHaveBeenCalledWith(profileId, {
      name: request.name,
      roles,
    });

    expect(result).toEqual(
      expect.objectContaining({
        profileId: updatedProfile.profileId,
        name: updatedProfile.name,
        roles: expect.arrayContaining([
          expect.objectContaining({ roleId: roles[0].roleId }),
          expect.objectContaining({ roleId: roles[1].roleId }),
        ]),
        createdAt: updatedProfile.createdAt,
        updatedAt: updatedProfile.updatedAt,
      }),
    );
  });
});
