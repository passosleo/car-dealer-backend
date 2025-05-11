export interface CreateBrandData {
  brandId?: string;
  name: string;
  imageUrl: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Brand {
  public readonly brandId: string;
  public name: string;
  public imageUrl: string;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  public constructor(data: CreateBrandData) {
    this.brandId = data.brandId!;
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateBrandData): Brand {
    return new Brand(data);
  }
}
