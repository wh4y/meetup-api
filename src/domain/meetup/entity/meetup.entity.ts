import { CreateMeetupOptions } from './options/create-meetup.options';
import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';

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

  public static create(options: CreateMeetupOptions): Meetup {
    const meetup = { ...options };
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
}
