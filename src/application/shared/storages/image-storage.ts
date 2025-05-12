export interface IImageStorage {
  uploadImageBase64(imageBase64: string): Promise<string>;
  updateImageBase64(imageUrl: string, imageBase64: string): Promise<string>;
  deleteImage(imageUrl: string | null): Promise<void>;
  getUsedPercentage(): Promise<number>;
}
