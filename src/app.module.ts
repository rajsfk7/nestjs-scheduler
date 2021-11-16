import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { TasktypeModule } from './modules/tasktype/tasktype.module';
import { TaskactModule } from './modules/taskact/taskact.module';
import { UserModule } from './modules/user/user.module';
import { TaskcronService } from './taskcron/taskcron.service';
import { BullModule } from '@nestjs/bull';
import { TaskqueService } from './taskque/taskque.service';
import { TaskactProcessor } from './modules/taskact/taskact.processor'

@Module({
  imports: [
    ConfigModule,
    // MongoDB Connection
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.getMongoConfig(),
    }),
    TasktypeModule,
    TaskactModule,
    UserModule,
    ScheduleModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        defaultJobOptions: {
          prefix: 'taskact',
          removeOnComplete: true
        },
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TaskcronService, TaskqueService, TaskactProcessor],
})
export class AppModule {}
