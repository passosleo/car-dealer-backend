import { LayoutTopBarMessage } from './layout-top-bar-message-entity';

export interface CreateLayoutTopBarConfigData {
  layoutTopBarConfigId?: string;
  layoutComponentId: string;
  maxItems?: number;
  loop?: boolean;
  delay?: number;
  direction?: string | null;
  jump?: boolean;
  hideOnMobile?: boolean;
  hideOnDesktop?: boolean;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  layoutTopBarMessages?: LayoutTopBarMessage[];
}

export class LayoutTopBarConfig {
  public readonly layoutTopBarConfigId: string;
  public layoutComponentId: string;
  public maxItems: number;
  public loop: boolean;
  public delay: number;
  public direction: string | null;
  public jump: boolean;
  public hideOnMobile: boolean;
  public hideOnDesktop: boolean;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public layoutTopBarMessages: LayoutTopBarMessage[];

  public constructor(data: CreateLayoutTopBarConfigData) {
    this.layoutTopBarConfigId = data.layoutTopBarConfigId!;
    this.layoutComponentId = data.layoutComponentId;
    this.maxItems = data.maxItems ?? 10;
    this.loop = data.loop ?? true;
    this.delay = data.delay ?? 3000;
    this.direction = data.direction ?? 'ltr';
    this.jump = data.jump ?? false;
    this.hideOnMobile = data.hideOnMobile ?? false;
    this.hideOnDesktop = data.hideOnDesktop ?? false;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
    this.layoutTopBarMessages = data.layoutTopBarMessages ?? [];
  }

  public static create(data: CreateLayoutTopBarConfigData): LayoutTopBarConfig {
    return new LayoutTopBarConfig(data);
  }
}
