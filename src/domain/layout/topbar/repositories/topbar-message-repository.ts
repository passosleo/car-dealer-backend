import { Paginated } from '../../../../infra/shared/types/generic';
import { TopBarMessage } from '../entities/top-bar-message-entity';

export type ListTopBarMessageParams = {
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

export interface ITopBarMessageRepository {
  create(data: TopBarMessage): Promise<TopBarMessage>;
  createMany(data: TopBarMessage[]): Promise<TopBarMessage[]>;
  update(id: string, data: Partial<TopBarMessage>): Promise<TopBarMessage>;
  updateMany(data: Partial<TopBarMessage>[]): Promise<TopBarMessage[]>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<TopBarMessage | null>;
  findByMessage(message: string): Promise<TopBarMessage | null>;
  findByMessages(messages: string[]): Promise<TopBarMessage[]>;
  list(data: ListTopBarMessageParams): Promise<Paginated<TopBarMessage>>;
  findAll(): Promise<TopBarMessage[]>;
}
