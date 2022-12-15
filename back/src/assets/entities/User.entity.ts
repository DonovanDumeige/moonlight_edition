import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../generics/enums';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: null })
  firstname: string;

  @Column({ default: null })
  lastname: string;

  @Column({ default: null })
  adress: string;

  @Column({ default: null })
  postalcode: number;

  @Column({ default: null })
  town: string;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  role: string;
}
