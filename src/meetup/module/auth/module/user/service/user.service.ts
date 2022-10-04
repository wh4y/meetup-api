import { IUserService } from './interface/user-service.interface';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateUserOptions } from '../entity/options/create-user.options';
import { User } from '../entity/user.entity';
import { UpdateUserOptions } from './options/update-user.options';
import { UserRepository } from '../repository/user.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: UserRepository,
  ) {
  }

  public async create(options: CreateUserOptions): Promise<User> {
    const existingUser = await this.findByEmail(options.email);
    if (existingUser) throw new Error('User already exists!');

    const user = User.create(options);
    await this.userRepo.save(user);

    return user;
  }

  public async delete(id: number): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw Error('User doesn\'t exist!');

    await this.userRepo.delete({ id });

    return user;
  }

  public async findById(id: number): Promise<User> {
    return await this.userRepo.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepo.findOneBy({ email });
  }

  public async findMany(options: any): Promise<User[]> {
    throw new NotImplementedException();
  }

  public async update(id: number, options: UpdateUserOptions): Promise<User> {
    const user = await this.findById(id);
    if (!user) throw Error('User doesn\'t exist!');

    await this.userRepo.update({ id }, options);

    return await this.findById(id);
  }
}
