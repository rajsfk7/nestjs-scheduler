import { Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateTaskactDto } from './dto/createTaskact.dto';
import { UpdateTaskactDto } from './dto/updateTaskact.dto';
import { TaskactService } from './taskact.service';

@Controller('taskact')
export class TaskactController {
    constructor(private taskactService: TaskactService) {}

    @Post('/createTaskact')
    async createTaskact(@Body() createTaskactDto: CreateTaskactDto, @Res() res: any) {
        const newTaskact: any = await this.taskactService.createTaskact(createTaskactDto);
        return res.status(HttpStatus.OK).send(newTaskact);
    }

    @Put('/updateTaskact/:id')
    async updateTaskact(
        @Param('id') id: MongooseSchema.Types.ObjectId,
        @Body() updateTaskactDto: UpdateTaskactDto,
        @Res() res: any,
    ) {
        const newTaskact: any = await this.taskactService.updateTaskact(updateTaskactDto);
        return res.status(HttpStatus.OK).send(newTaskact);
    }

    @Get('/getTaskactById/:id')
    async getTaskactById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const storage: any = await this.taskactService.getTaskactById(id);

        return res.status(HttpStatus.OK).send(storage);
    }

    @Get('/getTaskacts')
    async getAllTaskacts(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
        const storages: any = await this.taskactService.getTaskacts(getQueryDto);
        return res.status(HttpStatus.OK).send(storages);
    }
}