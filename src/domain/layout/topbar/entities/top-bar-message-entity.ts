export interface CreateTopBarMessageData {
  topBarMessageId?: string;
  message: string;
  link?: string | null;
  position?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TopBarMessage {
  public readonly topBarMessageId: string;
  public message: string;
  public link: string | null;
  public position: number;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  public constructor(data: CreateTopBarMessageData) {
    this.topBarMessageId = data.topBarMessageId!;
    this.message = data.message;
    this.link = data.link ?? null;
    this.position = data.position ?? 0;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateTopBarMessageData): TopBarMessage {
    return new TopBarMessage(data);
  }
}
