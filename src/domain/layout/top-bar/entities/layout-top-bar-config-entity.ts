import { LayoutComponent } from '../../components/entities/layout-component-entity';
import { LayoutTopBarMessage } from './layout-top-bar-message-entity';

export interface CreateLayoutTopBarConfigData {
  layoutTopBarConfigId?: string;
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
  layoutComponent: LayoutComponent;
  layoutTopBarMessages?: LayoutTopBarMessage[];
}

export class LayoutTopBarConfig {
  public readonly layoutTopBarConfigId: string;
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
  public layoutComponent: LayoutComponent;
  public layoutTopBarMessages: LayoutTopBarMessage[];

  public constructor(data: CreateLayoutTopBarConfigData) {
    this.layoutTopBarConfigId = data.layoutTopBarConfigId!;
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
    this.layoutComponent = data.layoutComponent;
    this.layoutTopBarMessages = data.layoutTopBarMessages ?? [];
  }

  public static create(data: CreateLayoutTopBarConfigData): LayoutTopBarConfig {
    return new LayoutTopBarConfig(data);
  }
}
