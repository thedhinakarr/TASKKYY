import sendMail from "./mailer.js";
import { scheduleJob, scheduledJobs } from "node-schedule";

const scheduleReminders = (user_id,task_name,email,reminders,deadline)=>{

    reminders.forEach((item,index)=>{

        console.log(item)

        scheduleJob(`Reminder ${index+1} for ${user_id}`,item,()=>{
            console.log(`Reminder ${index+1} sent`);
            sendMail({
                text:`This is reminder number ${index+1} for your task: ${task_name}`,
                subject:`task reminder ${index+1}`,
                receiver:email
            });
        });


    });
    
}

export default scheduleReminders;