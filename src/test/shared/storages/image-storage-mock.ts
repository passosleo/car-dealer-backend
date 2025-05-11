import { IImageStorage } from '../../../application/shared/storages/image-storage';

export const ImageStorageMock: jest.Mocked<IImageStorage> = {
  uploadImageBase64: jest.fn<Promise<string>, [string]>(),
  updateImageBase64: jest.fn<Promise<string>, [string, string]>(),
  deleteImage: jest.fn<Promise<void>, [string | null]>(),
  getUsedPercentage: jest.fn<Promise<number>, []>(),
};
