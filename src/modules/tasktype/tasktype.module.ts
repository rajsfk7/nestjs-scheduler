import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Tasktype, TasktypeSchema } from '../../entities/tasktype.entity';
import { User, UserSchema } from '../../entities/user.entity';
import { TasktypeRepository } from '../../repositories/tasktype.repository';
import { UserModule } from '../user/user.module';
import { TasktypeController } from './tasktype.controller';
import { TasktypeService } from './tasktype.service';

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        MongooseModule.forFeature([{ name: Tasktype.name, schema: TasktypeSchema }]),
    ],
    controllers: [TasktypeController],
    providers: [TasktypeService, TasktypeRepository],
    exports: [TasktypeService, TasktypeRepository],
})
export class TasktypeModule {}