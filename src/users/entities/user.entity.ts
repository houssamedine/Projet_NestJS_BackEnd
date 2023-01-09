import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    // name: 'user_name',
    // default: '',
    // type: 'string',
    // update: false,
    unique: true,
    length: 25,
    // primary: true,
    // nullable: false,
  })
  username: string;

  @Exclude()
  @Column({ length: 30 })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 30 })
  firstName: string;

  @Column({ length: 30 })
  lastName: string;

  @Exclude()
  @Column({ update: false, length: 30 })
  salt: string;
}
