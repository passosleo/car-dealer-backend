import { Paginated } from '../../../../infra/shared/types/generic';
import { LayoutTopBarMessage } from '../entities/layout-top-bar-message-entity';

export type ListLayoutTopBarMessageParams = {
  page?: number;
  limit?: number;
  orderBy?: 'asc' | 'desc';
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  createdAtStart?: Date;
  createdAtEnd?: Date;
  updatedAtStart?: Date;
  updatedAtEnd?: Date;
};

export interface ILayoutTopBarMessageRepository {
  create(data: LayoutTopBarMessage): Promise<LayoutTopBarMessage>;
  createMany(data: LayoutTopBarMessage[]): Promise<LayoutTopBarMessage[]>;
  update(id: string, data: Partial<LayoutTopBarMessage>): Promise<LayoutTopBarMessage>;
  updateMany(data: Partial<LayoutTopBarMessage>[]): Promise<LayoutTopBarMessage[]>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
  findById(id: string): Promise<LayoutTopBarMessage | null>;
  findByMessage(message: string): Promise<LayoutTopBarMessage | null>;
  findByMessages(messages: string[]): Promise<LayoutTopBarMessage[]>;
  list(data: ListLayoutTopBarMessageParams): Promise<Paginated<LayoutTopBarMessage>>;
  findAll(): Promise<LayoutTopBarMessage[]>;
}
