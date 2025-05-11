import { IHashService } from '../../../application/shared/services/hash-service';

export const HashServiceMock: jest.Mocked<IHashService> = {
  hash: jest.fn<Promise<string>, [string]>(),
  compare: jest.fn<Promise<boolean>, [string, string]>(),
};
