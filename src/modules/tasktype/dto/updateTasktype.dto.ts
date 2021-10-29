import { PartialType } from '@nestjs/mapped-types';

import { CreateTasktypeDto } from './createTasktype.dto';

export class UpdateTasktypeDto extends PartialType(CreateTasktypeDto) { }