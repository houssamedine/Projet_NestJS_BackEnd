import { Task } from './../../tasks/entities/task.entity';
import { GenriqueModule } from './../../commun/generiques/genirique-module';
import { Exclude } from 'class-transformer';
import { Entity, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
@Entity({
  name: 'users',
})
export class User extends GenriqueModule {
  @ApiProperty()
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

  @ApiProperty()
  @Exclude()
  @Column({ length: 30 })
  password: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({ length: 30 })
  firstName: string;

  @ApiProperty()
  @Column({ length: 30 })
  lastName: string;

  @Exclude()
  @Column({ update: false, length: 30 })
  salt: string;

  @ApiProperty()
  @OneToMany(() => Task, (task) => task.user, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  tasks: Task[];
}
