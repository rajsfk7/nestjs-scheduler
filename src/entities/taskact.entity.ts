import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

import { Tasktype } from './tasktype.entity';
import { User } from './user.entity';

@Schema()
export class Taskact extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: User.name })
    user: MongooseSchema.Types.ObjectId;

    @Prop({ type: String })
    taskactName: string;

    @Prop({ type: String })
    status: string;
    
    @Prop({ type: MongooseSchema.Types.ObjectId, required: false, ref: Tasktype.name })
    tasktype: any;

    @Prop({ type: Date, default: Date.now })
    updatedAt: Date;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const TaskactSchema = SchemaFactory.createForClass(Taskact);