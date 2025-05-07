import { IImageStorage } from '../../../application/shared/storages/image-storage';
import { v2 as cloudinary } from 'cloudinary';

export class ImageStorageCloudinary implements IImageStorage {
  public async uploadImageBase64(imageBase64: string): Promise<string> {
    const image = await cloudinary.uploader.upload(imageBase64, {
      resource_type: 'image',
    });
    return image.secure_url;
  }

  public async updateImageBase64(imageUrl: string, imageBase64: string): Promise<string> {
    const [resultUrl] = await Promise.all([this.uploadImageBase64(imageBase64), this.deleteImage(imageUrl)]);
    return resultUrl;
  }

  public async deleteImage(imageUrl: string | null): Promise<void> {
    if (!imageUrl) return;
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  }

  public async getUsedPercentage(): Promise<number> {
    const res = await cloudinary.api.usage();
    return res.credits.used_percent;
  }
}
