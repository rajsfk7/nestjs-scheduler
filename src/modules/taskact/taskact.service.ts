import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';

import { TaskactRepository } from '../../repositories/taskact.repository';
import { UserService } from '../user/user.service';
import { CreateTaskactDto } from './dto/createTaskact.dto';
import { UpdateTaskactDto } from './dto/updateTaskact.dto';

@Injectable()
export class TaskactService {
    constructor(private taskactRepository: TaskactRepository, private readonly userService: UserService,
        @InjectQueue('taskactqueue') private readonly taskactQueue: Queue,) {}

    async createTaskact(createTaskactDto: CreateTaskactDto) {
        return await this.taskactRepository.createTaskact(createTaskactDto);
    }

    async getTaskactById(taskactId: MongooseSchema.Types.ObjectId) {
        return await this.taskactRepository.getTaskactById(taskactId);
    }

    async deleteTaskactById(taskactId: MongooseSchema.Types.ObjectId) {
        return await this.taskactRepository.deleteTaskactById(taskactId);
    }

    async getTaskacts(getQueryDto: GetQueryDto) {
        return await this.taskactRepository.getTaskacts(getQueryDto);
    }

    async updateTaskact(updateTaskactDto: UpdateTaskactDto) {
        const taskact = await this.taskactRepository.updateTaskact(updateTaskactDto);
        return taskact;
    }
}