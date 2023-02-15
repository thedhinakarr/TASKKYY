import twilio from "twilio";

const accountSid = "ACbc033541579ff1ab1d260e10aec4f01f";
const authToken = "c791910b463e0042fad70ba371878432";

let client = twilio(accountSid,authToken);

async function sendSMS(obj){
    let message = await client.messages.create(
        {
            body: obj.message,
            from:"+12028041467",
            to:obj.phone
        }
    )
    console.log(message.sid);
}

export default sendSMS;