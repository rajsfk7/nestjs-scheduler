import { IsOptional } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class CreateTaskactDto {
    @IsOptional()
    taskactName: string;
    @IsOptional()
    userId: MongooseSchema.Types.ObjectId;
    @IsOptional()
    id: MongooseSchema.Types.ObjectId;
    @IsOptional()
    status: string;
    @IsOptional()
    tasktypeId: MongooseSchema.Types.ObjectId;
}