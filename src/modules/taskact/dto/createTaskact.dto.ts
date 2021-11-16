import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateTaskactDto {
    @IsOptional()
    taskactName: string;
    @IsOptional()
    userId: MongooseSchema.Types.ObjectId;
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    interval: {
        second: Number,
        minute: Number,
        hour: Number,
        day: Number,
        month: Number,
        week: Number
    };
    @IsOptional()
    status: string;
    @IsOptional()
    tasktypeId: MongooseSchema.Types.ObjectId;
}