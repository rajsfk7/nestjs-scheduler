import { InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { Taskact } from '../entities/taskact.entity';
import { CreateTaskactDto } from '../modules/taskact/dto/createTaskact.dto';
import { UpdateTaskactDto } from '../modules/taskact/dto/updateTaskact.dto';

export class TaskactRepository {
    constructor(@InjectModel(Taskact.name) private readonly taskactModel: Model<Taskact>) {}

    async createTaskact(createTaskactDto: CreateTaskactDto) {
        const newTaskact = new this.taskactModel({
            user: createTaskactDto.userId,
            taskactName: createTaskactDto.taskactName,
            status: 'CREATED',
            taskype: null,
        });
        try {
            const createdTaskact = await newTaskact.save();

            return createdTaskact;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async updateTaskact(updateTaskact: UpdateTaskactDto) {
        const actualDate = new Date();
        actualDate.toUTCString();

        const updateData = {
            status: updateTaskact.status,
            tasktype: updateTaskact.tasktypeId,
            updatedAt: actualDate,
        };

        try {
            const taskact = await this.taskactModel
                .findOneAndUpdate({ _id: updateTaskact.id }, updateData, {
                    new: true,
                })
                .exec();
            return taskact;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getTaskacts(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let taskacts: Taskact[];

        try {
            if (limit === 0) {
                taskacts = await this.taskactModel
                    .find()
                    .populate('tasktype')
                    .populate('user', 'name email')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                taskacts = await this.taskactModel
                    .find()
                    .populate('tasktype')
                    .populate('user', 'name email')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response;

            if (taskacts.length > 0) {
                response = {
                    ok: true,
                    data: taskacts,
                    message: 'Get Taskacts Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay taskacts',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    async getTaskactById(id: MongooseSchema.Types.ObjectId) {
        try {
            const taskact = await this.taskactModel.findById(id).exec();

            return taskact;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
