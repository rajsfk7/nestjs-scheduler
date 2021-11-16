import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { TasktypeRepository } from '../../repositories/tasktype.repository';
import { UserService } from '../user/user.service';
import { CreateTasktypeDto } from './dto/createTasktype.dto';


@Injectable()
export class TasktypeService {
    constructor(private readonly tasktypeRepository: TasktypeRepository, private readonly userService: UserService) {}

    async createTasktype(createTasktypeDto: CreateTasktypeDto) {
        console.log(">>" + JSON.stringify(createTasktypeDto))
        var mongoose = require('mongoose');

        var objUserId = mongoose.Types.ObjectId("" + createTasktypeDto.userId)
        const getUser: any = await this.userService.getUserById(objUserId);

        if (getUser.role === 'ADMIN') {            
            return await this.tasktypeRepository.createTasktype(createTasktypeDto);
        } else {
            throw new UnauthorizedException('Incorrect Role');
        }
    }

    async getTasktypes(getQueryDto: GetQueryDto) {
        return await this.tasktypeRepository.getTasktypes(getQueryDto);
    }

    async getTasktypeById(id: MongooseSchema.Types.ObjectId) {
        return await this.tasktypeRepository.getTasktypeById(id);
    }
}