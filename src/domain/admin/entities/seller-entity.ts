export interface CreateSellerData {
  sellerId?: string;
  firstName: string;
  lastName?: string | null;
  email?: string | null;
  phone?: string | null;
  imageUrl?: string | null;
  customMessage?: string | null;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Seller {
  public readonly sellerId: string;
  public firstName: string;
  public lastName: string | null;
  public email: string | null;
  public phone: string | null;
  public imageUrl: string | null;
  public customMessage: string | null;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  constructor(data: CreateSellerData) {
    this.sellerId = data.sellerId!;
    this.firstName = data.firstName;
    this.lastName = data.lastName ?? null;
    this.email = data.email ?? null;
    this.phone = data.phone ?? null;
    this.imageUrl = data.imageUrl ?? null;
    this.customMessage = data.customMessage ?? null;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateSellerData): Seller {
    return new Seller(data);
  }
}
