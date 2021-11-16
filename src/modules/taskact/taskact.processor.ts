import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('taskactqueue')
export class TaskactProcessor {
    @Process('taskactjob')
    readOperationJob(job:Job<unknown>){
        console.log("Running Task ...")
        console.log(job.data);
    }
}