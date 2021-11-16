import { InjectQueue } from '@nestjs/bull';
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import Bull, { Queue } from 'bull';
import { Schema as MongooseSchema } from 'mongoose';

import { GetQueryDto } from '../../dto/getQueryDto';
import { CreateTaskactDto } from './dto/createTaskact.dto';
import { UpdateTaskactDto } from './dto/updateTaskact.dto';
import { TaskactService } from './taskact.service';

@Controller('taskact')
export class TaskactController {
    constructor(private taskactService: TaskactService,
        private schedulerRegistry: SchedulerRegistry,
        @InjectQueue('taskactqueue') private readonly taskactQueue: Queue,) {}

    @Post('/createTaskact')
    async createTaskact(@Body() createTaskactDto: CreateTaskactDto, @Res() res: any) {

        const newTaskact: any = await this.taskactService.createTaskact(createTaskactDto);

        const cronTime = this.makeStar(createTaskactDto.interval.second) + ' ' + 
                            this.makeStar(createTaskactDto.interval.minute) + ' ' + 
                            this.makeStar(createTaskactDto.interval.hour) + ' ' + 
                            this.makeStar(createTaskactDto.interval.day) + ' ' + 
                            this.makeStar(createTaskactDto.interval.month) + ' ' + 
                            this.makeStar(createTaskactDto.interval.week);

        const job = await this.taskactQueue.add('taskactjob',{
            newTaskact
        },{
            repeat: {
                cron: cronTime
            }
        });
        
        const resp = {
            jobid: job.id,
            taskact: newTaskact
        }
        return res.status(HttpStatus.OK).send(resp);
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

    @Delete('/deleteTaskactById/:id')
    async deleteTaskactById(@Param('id') id: MongooseSchema.Types.ObjectId, @Res() res: any) {
        const storage: any = await this.taskactService.deleteTaskactById(id);



        //const job = await this.taskactQueue.removeRepeatableByKey({});

        return res.status(HttpStatus.OK).send(storage);
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

    makeStar(value){
        let returnResult = "*"
        if(value){
            if(value == 0){
            }
            else{
                returnResult = value;
            }
        }
        else if(value !== ""){
            if(value == 0){
            }
            else{
                returnResult = value;
            }
        }
        return returnResult
    }
}