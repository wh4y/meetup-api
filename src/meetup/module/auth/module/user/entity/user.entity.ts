import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CreateUserOptions } from './options/create-user.options';
import { Exclude } from 'class-transformer';
import { Meetup } from '../../../../../entity/meetup/meetup.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @ApiProperty()
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

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  public readonly firstName: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  public readonly lastName: string;

  @ApiProperty({ type: () => [Meetup] })
  @ManyToMany(() => Meetup, (meetup) => meetup.guests)
  public readonly signedMeetups: Meetup[];

  @ApiProperty({ type: () => [Meetup] })
  @ManyToMany(() => Meetup, (meetup) => meetup.organizers)
  public readonly registeredMeetups: Meetup[];

  public static create(options: CreateUserOptions): User {
    const user = {
      ...options,
      signedMeetups: options.signedMeetups || [],
      registeredMeetups: options.registeredMeetups || [],
    };
    Reflect.setPrototypeOf(user, User.prototype);

    return user as User;
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
