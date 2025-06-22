import { LayoutTopBarConfig } from '@prisma/client';

export interface CreateLayoutTopBarMessageData {
  layoutTopBarMessageId?: string;
  message: string;
  link?: string | null;
  position?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  layoutTopBarConfig: LayoutTopBarConfig;
}

export class LayoutTopBarMessage {
  public readonly layoutTopBarMessageId: string;
  public message: string;
  public link: string | null;
  public position: number;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public layoutTopBarConfig: LayoutTopBarConfig;

  public constructor(data: CreateLayoutTopBarMessageData) {
    this.layoutTopBarMessageId = data.layoutTopBarMessageId!;
    this.message = data.message;
    this.link = data.link ?? null;
    this.position = data.position ?? 0;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.layoutTopBarConfig = data.layoutTopBarConfig;
  }

  public static create(data: CreateLayoutTopBarMessageData): LayoutTopBarMessage {
    return new LayoutTopBarMessage(data);
  }
}
