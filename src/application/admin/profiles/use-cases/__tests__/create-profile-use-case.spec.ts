import { faker } from '@faker-js/faker';
import { CreateProfileUseCase } from '../create-profile-use-case';
import { ProfileRepositoryMock } from '../../../../../test/admin/repositories/profile-repository-mock';
import { RoleRepositoryMock } from '../../../../../test/admin/repositories/role-repository-mock';
import { CreateProfileRequestDTO } from '../../../../../infra/admin/profiles/http/dtos/create-profile-request-dto';
import { HttpException } from '../../../../../infra/shared/http/response/http-exception';
import { ProfileMockFactory } from '../../../../../test/admin/factories/profile-mock-factory';
import { RoleMockFactory } from '../../../../../test/admin/factories/role-mock-factory';

describe('CreateProfileUseCase', () => {
  let sut: CreateProfileUseCase;

  beforeEach(() => {
    sut = new CreateProfileUseCase(ProfileRepositoryMock, RoleRepositoryMock);
    jest.clearAllMocks();
  });

  it('should throw a unprocessable entity exception when list if roles is empty', async () => {
    // Arrange
    const requestWithEmptyRoles = CreateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [],
    });

    // Act & Assert
    await expect(sut.execute(requestWithEmptyRoles)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findByName).not.toHaveBeenCalled();
    expect(RoleRepositoryMock.findByIds).not.toHaveBeenCalled();
    expect(ProfileRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a conflict exception when another profile with same name exists', async () => {
    // Arrange
    const request = CreateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [
        {
          roleId: faker.string.uuid(),
        },
      ],
    });
    const profileExists = ProfileMockFactory.createEntity({
      name: request.name,
    });

    ProfileRepositoryMock.findByName.mockResolvedValueOnce(profileExists);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(RoleRepositoryMock.findByIds).not.toHaveBeenCalled();
    expect(ProfileRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should throw a unprocessable entity exception when some provided role is not valid', async () => {
    // Arrange
    const request = CreateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [
        {
          roleId: faker.string.uuid(),
        },
        {
          roleId: faker.string.uuid(),
        },
      ],
    });
    const roleExists = RoleMockFactory.createEntity({
      roleId: request.roles[0].roleId,
    });

    ProfileRepositoryMock.findByName.mockResolvedValueOnce(null);
    RoleRepositoryMock.findByIds.mockResolvedValueOnce([roleExists]);

    // Act & Assert
    await expect(sut.execute(request)).rejects.toThrow(HttpException);

    // Assert
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(RoleRepositoryMock.findByIds).toHaveBeenCalledTimes(1);
    expect(RoleRepositoryMock.findByIds).toHaveBeenCalledWith(request.roles.map((role) => role.roleId));
    expect(ProfileRepositoryMock.create).not.toHaveBeenCalled();
  });

  it('should create a new profile successfully', async () => {
    // Arrange
    const request = CreateProfileRequestDTO.create({
      name: faker.lorem.word(),
      roles: [
        {
          roleId: faker.string.uuid(),
        },
        {
          roleId: faker.string.uuid(),
        },
      ],
    });
    const roles = [
      RoleMockFactory.createEntity({
        roleId: request.roles[0].roleId,
      }),
      RoleMockFactory.createEntity({
        roleId: request.roles[1].roleId,
      }),
    ];
    const createdProfile = ProfileMockFactory.createEntity({
      name: request.name,
      roles,
    });

    ProfileRepositoryMock.findByName.mockResolvedValueOnce(null);
    RoleRepositoryMock.findByIds.mockResolvedValueOnce(roles);
    ProfileRepositoryMock.create.mockResolvedValueOnce(createdProfile);

    // Act
    const result = await sut.execute(request);

    // Assert

    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.findByName).toHaveBeenCalledWith(request.name);
    expect(RoleRepositoryMock.findByIds).toHaveBeenCalledTimes(1);
    expect(RoleRepositoryMock.findByIds).toHaveBeenCalledWith(request.roles.map((role) => role.roleId));
    expect(ProfileRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(ProfileRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: request.name,
        roles: expect.arrayContaining([
          expect.objectContaining({
            roleId: roles[0].roleId,
          }),
          expect.objectContaining({
            roleId: roles[1].roleId,
          }),
        ]),
      }),
    );
    expect(result).toEqual(
      expect.objectContaining({
        profileId: createdProfile.profileId,
        name: createdProfile.name,
        roles: expect.arrayContaining([
          expect.objectContaining({
            roleId: roles[0].roleId,
          }),
          expect.objectContaining({
            roleId: roles[1].roleId,
          }),
        ]),
        createdAt: createdProfile.createdAt,
        updatedAt: createdProfile.updatedAt,
      }),
    );
  });
});
