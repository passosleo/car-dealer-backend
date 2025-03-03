export interface CreateCategoryData {
  categoryId?: string;
  name: string;
  imageUrl: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Category {
  public readonly categoryId: string;
  public name: string;
  public imageUrl: string;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  public constructor(data: CreateCategoryData) {
    this.categoryId = data.categoryId!;
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateCategoryData): Category {
    return new Category(data);
  }
}
