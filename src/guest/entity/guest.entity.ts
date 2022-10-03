import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Guest {
  @PrimaryGeneratedColumn('increment')
  private readonly id: number;

  @Column({
    type: 'varchar',
  })
  private readonly email: string;

  @Column({
    type: 'varchar',
  })
  private readonly password: string;

  @Column({
    type: 'varchar',
  })
  private readonly firstName: string;

  @Column({
    type: 'varchar',
  })
  private readonly lastName: string;
}
