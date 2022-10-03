import { CreateUserOptions } from '../../entity/options/create-user.options';
import { User } from '../../entity/user.entity';
import { UpdateUserOptions } from '../options/update-user.options';

export interface IUserService {
  findById(id: number): Promise<User>;

  findMany(options: any): Promise<User[]>;

  create(options: CreateUserOptions): Promise<User>;

  update(id: number, options: UpdateUserOptions): Promise<User>;

  delete(id: number): Promise<User>;

  findByEmail(email: string): Promise<User>;
}
