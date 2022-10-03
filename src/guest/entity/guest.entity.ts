import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateGuestOptions } from './options/create-guest.options';

@Entity()
export class Guest {

  @PrimaryGeneratedColumn('increment')
  public readonly id: number;

  @Column({
    type: 'varchar',
  })
  public readonly email: string;

  @Column({
    type: 'varchar',
  })
  public readonly password: string;

  @Column({
    type: 'varchar',
  })
  public readonly firstName: string;

  @Column({
    type: 'varchar',
  })
  public readonly lastName: string;

  public static create(options: CreateGuestOptions): Guest {
    const guest = { ...options };
    Reflect.setPrototypeOf(guest, Guest.prototype);

    return guest as Guest;
  }

  public withEmail(email: string): Guest {
    return Guest.create({ ...this, email });
  }

  public withPassword(password: string): Guest {
    return Guest.create({ ...this, password });
  }

  public withFirstName(firstName: string): Guest {
    return Guest.create({ ...this, firstName });
  }

  public withLastName(lastName: string): Guest {
    return Guest.create({ ...this, lastName });
  }
}
