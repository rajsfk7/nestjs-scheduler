import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TaskcronService {
    constructor(private schedulerRegistry: SchedulerRegistry) {}

    private readonly logger = new Logger(TaskcronService.name);

    @Cron('* 1 * * * *', {
        name: 'notifications',
    })
    triggerNotifications() {
        console.log("Send notification")
    }
    
    triggerMail() {
        console.log("Send mail")
    }

    triggerReportGenerate(){
        console.log("Generate Report")
    }
}
