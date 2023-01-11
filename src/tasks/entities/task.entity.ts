import { StatusTasksEnum } from './../../commun/enums/status_task_enum';
import { GenriqueModule } from './../../commun/generiques/genirique-module';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'tasks',
})
export class Task extends GenriqueModule {
  @ApiProperty({
    type: 'enum',
    enum: StatusTasksEnum,
    default: StatusTasksEnum.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: StatusTasksEnum,
    default: StatusTasksEnum.ACTIVE,
  })
  status: string;

  @ApiProperty()
  @Column({ length: 10 })
  title: string;

  @ApiProperty()
  @Column({ length: 50 })
  description: string;

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
