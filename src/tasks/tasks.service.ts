import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private repositoryTask: Repository<Task>,
  ) {}

  create(createTaskDto: CreateTaskDto) {
    return this.repositoryTask.save(createTaskDto);
  }

  findAll() {
    return this.repositoryTask.find();
  }

  findOne(id: string) {
    return this.repositoryTask.findOne({ where: { id } });
  }

  update(id: string, updateTaskDto: UpdateTaskDto) {
    return;
  }

  remove(id: string) {
    return `This action removes a #${id} task`;
  }
}
