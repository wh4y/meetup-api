import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserOptions } from './options/create-user.options';
import { Exclude } from 'class-transformer';
import { Meetup } from '../../../../../entity/meetup/meetup.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({
    type: 'varchar',
  })
  public readonly email: string;

  @Column({
    unique: true,
    type: 'varchar',
  })
  @Exclude()
  public readonly password: string;

  @Column({
    type: 'varchar',
  })
  public readonly firstName: string;

  @Column({
    type: 'varchar',
  })
  public readonly lastName: string;

  @ManyToMany(() => Meetup, (meetup) => meetup.guests)
  public readonly signedMeetups: Meetup[];

  public static create(options: CreateUserOptions): User {
    const guest = { ...options };
    Reflect.setPrototypeOf(guest, User.prototype);

    return guest as User;
  }

  public withEmail(email: string): User {
    return User.create({ ...this, email });
  }

  public withPassword(password: string): User {
    return User.create({ ...this, password });
  }

  public withFirstName(firstName: string): User {
    return User.create({ ...this, firstName });
  }

  public withLastName(lastName: string): User {
    return User.create({ ...this, lastName });
  }
}
