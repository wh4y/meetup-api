import { CreateGuestOptions } from '../../options/create-guest.options';
import { Guest } from '../../guest.entity';

export interface IGuestService {
  findById(id: number): Promise<Guest>;

  findMany(options: any): Promise<Guest[]>;

  create(options: CreateGuestOptions): Promise<Guest>;

  update(options: any): Promise<Guest>;

  delete(id: number): Promise<Guest>;
}
