// TokenServiceMock.ts
import { faker } from '@faker-js/faker';
import { ITokenService } from '../../../application/shared/services/token-service';

export const TokenServiceMock: jest.Mocked<ITokenService> = {
  generateAccessToken: jest.fn().mockImplementation((_: any): string => {
    return `access-${faker.string.uuid()}`;
  }),

  verifyAccessToken: jest.fn().mockImplementation((_: string): any => {
    return { id: faker.string.uuid() };
  }),

  generateRefreshToken: jest.fn().mockImplementation((_: any): string => {
    return `refresh-${faker.string.uuid()}`;
  }),

  verifyRefreshToken: jest.fn().mockImplementation((_: string): any => {
    return { id: faker.string.uuid() };
  }),
};
