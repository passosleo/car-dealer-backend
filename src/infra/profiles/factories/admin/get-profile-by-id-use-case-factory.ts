import { GetProfileByIdUseCase } from '../../../../application/profiles/use-cases/admin/get-profile-by-id-use-case';
import { ProfileRepositoryPrisma } from '../../repositories/profile-repository-prisma';

export class GetProfileByIdUseCaseFactory {
  public static create(): GetProfileByIdUseCase {
    const profileRepository = new ProfileRepositoryPrisma();
    return new GetProfileByIdUseCase(profileRepository);
  }
}
