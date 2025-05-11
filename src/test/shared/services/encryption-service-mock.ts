import { IEncryptionService } from '../../../application/shared/services/encryption-service';

export const EncrypionServiceMock: jest.Mocked<IEncryptionService> = {
  encrypt: jest.fn().mockImplementation((_: any): string => {
    return `encrypted-${_}`;
  }),
  decrypt: jest.fn().mockImplementation((_: string): any => {
    return _.replace('encrypted-', '');
  }),
};
