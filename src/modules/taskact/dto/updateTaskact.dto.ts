import { PartialType } from '@nestjs/mapped-types';

import { CreateTaskactDto } from './createTaskact.dto';

export class UpdateTaskactDto extends PartialType(CreateTaskactDto) {}