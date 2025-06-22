export interface CreateLayoutComponentData {
  layoutComponentId?: string;
  name: string;
  page: string;
  description?: string | null;
  position?: number;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class LayoutComponent {
  public readonly layoutComponentId: string;
  public name: string;
  public page: string;
  public description: string | null;
  public position: number;
  public active: boolean;
  public readonly createdAt: Date;
  public updatedAt: Date;

  public constructor(data: CreateLayoutComponentData) {
    this.layoutComponentId = data.layoutComponentId!;
    this.name = data.name;
    this.page = data.page;
    this.description = data.description ?? null;
    this.position = data.position ?? 0;
    this.active = data.active ?? true;
    this.createdAt = data.createdAt ?? new Date();
    this.updatedAt = data.updatedAt ?? new Date();
  }

  public static create(data: CreateLayoutComponentData): LayoutComponent {
    return new LayoutComponent(data);
  }
}
