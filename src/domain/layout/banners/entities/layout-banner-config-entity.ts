import { LayoutComponent } from '../../entities/layout-component-entity';
import { LayoutBannerPosition } from './layout-banner-position-entity';

export interface CreateLayoutBannerConfigData {
  layoutBannerConfigId?: string;
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
  layoutBannerPositions?: LayoutBannerPosition[];
}

export class LayoutBannerConfig {
  public readonly layoutBannerConfigId: string;
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
  public layoutBannerPositions: LayoutBannerPosition[];

  public constructor(data: CreateLayoutBannerConfigData) {
    this.layoutBannerConfigId = data.layoutBannerConfigId!;
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
    this.layoutBannerPositions = data.layoutBannerPositions ?? [];
  }

  public static create(data: CreateLayoutBannerConfigData): LayoutBannerConfig {
    return new LayoutBannerConfig(data);
  }
}
