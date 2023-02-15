import nodemailer from "nodemailer";
import config from "config";

let {HOST,AUTH,PORT} = config.get("EMAIL");

async function sendMail(obj){

    let transporter = nodemailer.createTransport({
        host:HOST,
        port:PORT,
        secure:true,
        auth:{
            user:AUTH.USER,
            pass:AUTH.PASSWORD
        },
        tls:{
            rejectUnauthorized:true,
        }
    });

    let info = await transporter.sendMail({
        from:"FTASKY SCHEDULER---> <info@dhinakarr.in>",
        to:obj.receiver,
        subject:obj.subject,
        text:obj.text
    });

    console.log(`Message sent: ${info.messageId} `)

}

export default sendMail;