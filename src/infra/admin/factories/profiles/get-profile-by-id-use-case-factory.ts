import { GetProfileByIdUseCase } from '../../../../application/admin/use-cases/profiles/get-profile-by-id-use-case';
import { ProfileRepositoryPrisma } from '../../data/repositories/profile-repository-prisma';

export class GetProfileByIdUseCaseFactory {
  public static create(): GetProfileByIdUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new GetProfileByIdUseCase(profileRepository);
  }
}
