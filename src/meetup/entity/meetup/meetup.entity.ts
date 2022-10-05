import { CreateMeetupOptions } from './options/create-meetup.options';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../module/auth/module/user/entity/user.entity';

@Entity('Meetup')
export class Meetup {

  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({
    type: 'varchar',
  })
  public readonly title: string;

  @Column({
    type: 'text',
  })
  public readonly description: string;

  @Column({
    type: 'timestamp',
  })
  public readonly datetime: Date;

  @Column({
    type: 'varchar',
  })
  public readonly address: string;

  @Column({
    array: true,
    type: 'varchar',
  })
  public readonly tags: string[];

  @ManyToMany(() => User, (guest) => guest.signedMeetups)
  @JoinTable()
  public readonly guests: User[];

  public static create(options: CreateMeetupOptions): Meetup {
    const guests = options.guests || [];
    const meetup = { ...options, guests };
    Reflect.setPrototypeOf(meetup, Meetup.prototype);

    return meetup as Meetup;
  }

  public withTitle(title: string): Meetup {
    return Meetup.create({ ...this, title });
  }

  public withDescription(description: string): Meetup {
    return Meetup.create({ ...this, description });
  }

  public withDatetime(datetime: Date): Meetup {
    return Meetup.create({ ...this, datetime });
  }

  public withTags(tags: string[]): Meetup {
    return Meetup.create({ ...this, tags });
  }

  public withAddress(address: string): Meetup {
    return Meetup.create({ ...this, address });
  }

  public withGuests(guests: User[]): Meetup {
    return Meetup.create({ ...this, guests });
  }
}
