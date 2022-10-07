import { CreateMeetupOptions } from './options/create-meetup.options';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../module/auth/module/user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Meetup')
export class Meetup {

  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  public readonly title: string;

  @ApiProperty()
  @Column({
    type: 'text',
  })
  public readonly description: string;

  @ApiProperty()
  @Column({
    type: 'timestamp',
  })
  public readonly datetime: Date;

  @ApiProperty()
  @Column({
    type: 'varchar',
  })
  public readonly address: string;

  @ApiProperty({ type: [String] })
  @Column({
    array: true,
    type: 'varchar',
  })
  public readonly tags: string[];

  @ApiProperty({ type: () => [User] })
  @ManyToMany(() => User, (guest) => guest.signedMeetups)
  @JoinTable()
  public readonly guests: User[];

  @ApiProperty({ type: () => [User] })
  @ManyToMany(() => User, (organizer) => organizer.registeredMeetups)
  @JoinTable()
  public readonly organizers: User[];

  public static create(options: CreateMeetupOptions): Meetup {
    const meetup = { ...options, guests: options.guests || [], organizers: options.organizers || [] };
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
