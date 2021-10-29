import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { TasktypeService } from './tasktype.service';
import { CreateTasktypeDto } from './dto/createTasktype.dto';

@Controller('tasktype')
export class TasktypeController {
    constructor(private tasktypeService: TasktypeService) {}

    @Post('/createTasktype')
    async createTasktype(@Body() createTasktypeDto: CreateTasktypeDto, @Res() res: any) {
        const newTasktype = await this.tasktypeService.createTasktype(createTasktypeDto);
        return res.status(HttpStatus.OK).send(newTasktype);
    }

    @Get('/getTasktypes')
    async getTasktypes(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const tasktypes: any = await this.tasktypeService.getTasktypes(getQueryDto);
        return res.status(HttpStatus.OK).send(tasktypes);
    }

    @Get('/getTasktypeById/:id')
    async getTasktypeById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const tasktype: any = await this.tasktypeService.getTasktypeById(id);
        return res.status(HttpStatus.OK).send(tasktype);
    }
}