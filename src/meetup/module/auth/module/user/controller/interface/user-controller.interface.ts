import { User } from '../../entity/user.entity';

export interface IUserController {
  getById(id: number): Promise<User>;

  getMany(dto?: unknown): Promise<unknown>;
}
