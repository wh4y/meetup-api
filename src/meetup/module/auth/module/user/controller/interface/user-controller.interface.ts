import { User } from '../../entity/user.entity';

export interface IUserController {
  findById(id: number): Promise<User>;

  findMany(dto?: unknown): Promise<unknown>;
}
