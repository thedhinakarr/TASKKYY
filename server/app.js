import express  from "express";
import config from "config";
import dbConnect from "./dbConnect.js";

import UserRouter from "./controllers/users/index.js";
import TaskRouter from "./controllers/tasks/index.js";

const port = config.get("PORT");
const app = express();


app.use(express.json());
app.use("/api/user",UserRouter);
app.use("/api/task",TaskRouter);


app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})




