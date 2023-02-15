import mongoose from "mongoose";
import config from "config";

let DB_URI = config.get("DB_URI");

const dbConnect = async () =>{
    try {
        await mongoose.connect(DB_URI);
        console.log("CONNECTED TO DB");
    } catch (error) {
        console.log(error);
    }
};

await dbConnect();

export default dbConnect;