import { User } from 'src/users/entities/user.entity';
import { StatusTasksEnum } from './../../commun/enums/status_task_enum';
import {
  IsEnum,
  IsNotEmpty,
  MaxLength,
  MinLength,
  Length,
  IsNotEmptyObject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    type: 'enum',
    enum: StatusTasksEnum,
    default: StatusTasksEnum.ACTIVE,
  })
  @IsNotEmpty()
  @IsEnum(StatusTasksEnum)
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(3, 10)
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(5)
  description: string;

  @ApiProperty()
  @IsNotEmptyObject()
  user: User;
}
