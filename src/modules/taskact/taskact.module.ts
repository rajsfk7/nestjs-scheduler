import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';

import { Taskact, TaskactSchema } from '../../entities/taskact.entity';
import { TaskactRepository } from '../../repositories/taskact.repository';
import { TasktypeModule } from '../tasktype/tasktype.module';
import { UserModule } from '../user/user.module';
import { TaskactController } from './taskact.controller';
import { TaskactService } from './taskact.service';

@Module({
    imports: [UserModule, TasktypeModule, MongooseModule.forFeature([{ name: Taskact.name, schema: TaskactSchema }]),
    BullModule.registerQueue({
        name: 'taskactqueue',
        // processors: [{
        //     name: 'taskactrun',
        //     path: join(__dirname, 'taskact.processor.js')
        // }],
    })],
    controllers: [TaskactController],
    providers: [TaskactService, TaskactRepository],
    exports: [TaskactService, TaskactRepository],
})
export class TaskactModule {}