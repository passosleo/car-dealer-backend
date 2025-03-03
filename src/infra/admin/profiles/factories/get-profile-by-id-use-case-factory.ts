import { GetProfileByIdUseCase } from '../../../../application/admin/profiles/use-cases/get-profile-by-id-use-case';
import { ProfileRepositoryPrisma } from '../../profiles/data/repositories/profile-repository-prisma';

export class GetProfileByIdUseCaseFactory {
  public static create(): GetProfileByIdUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new GetProfileByIdUseCase(profileRepository);
  }
}
