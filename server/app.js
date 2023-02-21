import express  from "express";
import config from "config";
import dbConnect from "./dbConnect.js";
import path from "path";
import { fileURLToPath } from "url"


import UserRouter from "./controllers/users/index.js";
import TaskRouter from "./controllers/tasks/index.js";

const port = config.get("PORT");
const app = express();


const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename); //

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());

app.use("/api/user",UserRouter);
app.use("/api/task",TaskRouter);

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})




