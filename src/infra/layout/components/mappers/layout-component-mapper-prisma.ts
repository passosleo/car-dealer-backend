import { LayoutComponent as LayoutComponentPrisma } from '@prisma/client';
import { LayoutComponent } from '../../../../domain/layout/components/entities/layout-component-entity';

export class LayoutComponentMapperPrisma {
  public static toDomain(data: LayoutComponentPrisma): LayoutComponent {
    return LayoutComponent.create(data);
  }

  public static toPrisma(data: LayoutComponent): LayoutComponentPrisma {
    return {
      layoutComponentId: data.layoutComponentId,
      label: data.label,
      name: data.name,
      page: data.page,
      description: data.description,
      position: data.position,
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  public static toPartialPrisma(data: Partial<LayoutComponent>): Partial<LayoutComponentPrisma> {
    return this.toPrisma(data as LayoutComponent);
  }
}
