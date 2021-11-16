import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Tasktype } from '../entities/tasktype.entity';
import { CreateTasktypeDto } from '../modules/tasktype/dto/createTasktype.dto';

export class TasktypeRepository {
    constructor(
        @InjectModel(Tasktype.name)
        private readonly tasktypeModel: Model<Tasktype>,
    ) {}

    async createTasktype(createTasktypeDto: CreateTasktypeDto) {
        const tasktypeExists: any = await this.getTasktypeByName(createTasktypeDto.name);

        if (!tasktypeExists.ok) {
            const newTasktype = new this.tasktypeModel({
                name: createTasktypeDto.name,                
                user: createTasktypeDto.userId,
            });

            try {
                const createdTasktype = await newTasktype.save();
                return createdTasktype;
            } catch (error) {
                throw new InternalServerErrorException('Error to consult BD', error);
            }
        } else {
            throw new ConflictException('The tasktype or exist');
        }
    }

    async getTasktypes(query: GetQueryDto) {
        // Paginar resultado
        let from = query.from || 0;
        from = Number(from);

        let limit = query.limit || 0;
        limit = Number(limit);

        let tasktypes: Tasktype[];

        try {
            if (limit === 0) {
                tasktypes = await this.tasktypeModel
                    .find()
                    .populate('tasktypes')
                    .skip(from)
                    .sort({ createdAt: -1 })
                    .exec();
            } else {
                tasktypes = await this.tasktypeModel
                    .find()
                    .populate('tasktypes')
                    .skip(from)
                    .limit(limit)
                    .sort({ createdAt: -1 })
                    .exec();
            }

            let response: ResponseDto;

            if (tasktypes.length > 0) {
                response = {
                    ok: true,
                    data: tasktypes,
                    message: 'Get Tasktypes Ok!',
                };
            } else {
                response = {
                    ok: true,
                    data: [],
                    message: 'No hay tasktypees',
                };
            }
            return response;
        } catch (error) {
            throw new InternalServerErrorException('Error trying to consult the tasktypees', error);
        }
    }

    async getTasktypeById(id: MongooseSchema.Types.ObjectId) {
        try {
            const tasktype = await this.tasktypeModel.findById(id).exec();

            return tasktype;
        } catch (error) {
            throw new InternalServerErrorException('No registry with id' + id, error);
        }
    }

    async getTasktypeByName(name: string) {
        try {
            const tasktype = await this.tasktypeModel.find({ name });
            return tasktype;
        } catch (error) {
            throw new InternalServerErrorException('Error to consult BD', error);
        }
    }
}