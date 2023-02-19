import express from "express";

import Task from "../../models/Tasks/index.js";
import User from "../../models/Users/index.js";
import { isAuthenticated } from "../../middleware/auth/index.js";
import scheduleReminders from "../../utils/scheduleReminders.js";


const router = express.Router();

router.post("/add", isAuthenticated, async (req, res) => {
    try {

        console.log(req.body);
        let findEmail = await User.findOne({ _id: req.payload.id });
        if (!findEmail) {
            return res.status(400).json({ message: "Unauthorized" });
        }

        let id = findEmail._id;

        let { task_name, deadline } = req.body;

        let epochDeadline = Date.parse(deadline);

        let current = Date.now();

        console.log("Epoch Deadline: " + epochDeadline)
        console.log("Current time: " + current)


        if (epochDeadline < current) {
            return res.status(400).json({ error: "Invalid Date" });
        }

        let interval = (epochDeadline - current) / 4;

        console.log("Interval in epoch " + interval);

        console.log(epochDeadline - interval)

        let reminders = [
            new Date(current + interval),
            new Date(current + (interval * 2)),
            new Date(current + (interval * 3))
        ]

        let task = new Task({
            task_name,
            deadline: (epochDeadline + 19800000),
            reminders,
            user: id
        });

        await task.save();

        scheduleReminders(id, task_name, findEmail.email, reminders, deadline)

        res.status(200).json({ message: "Task successfully added." })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

router.post("/delete", isAuthenticated, async (req, res) => {
    try {
        console.log(req.body);

        let { task_name } = req.body;

        let foundUser = await User.findOne({ _id: req.payload.id })
        if (!foundUser) {
            res.status(400).json({ message: "Auth failed" })
        }

        await Task.deleteOne({ task_name: task_name });
        res.status(200).json({ "message": "Task successfully deleted" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/edit", isAuthenticated, async (req, res) => {
    try {
        console.log(req.body)
        let { task_name, deadline } = req.body;

        let foundUser = await User.findOne({ _id: req.payload.id })

        if (!foundUser) {
            res.status(400).json({ message: "Auth failed" })
        }

        let id = foundUser._id;
        console.log(id)
        let epochDeadline = Date.parse(deadline);

        let current = Date.now();

        console.log("Epoch Deadline: " + epochDeadline)
        console.log("Current time: " + current)


        if (epochDeadline < current||epochDeadline==0) {
            return res.status(400).json({ error: "Invalid Date" });
        }

        let interval = (epochDeadline - current) / 4;

        console.log("Interval in epoch " + interval);

        console.log(epochDeadline - interval)

        let reminders = [
            new Date(current + interval),
            new Date(current + (interval * 2)),
            new Date(current + (interval * 3))
        ]


        let x = await Task.updateOne({$and:[{user: id},{task_name:task_name}]}, {
            $set: {
                deadline:(epochDeadline + 19800000),
            }
        });

        console.log(x)

        let y = await Task.findOne({$and:[{ task_name: task_name },{user:foundUser._id}]});
        console.log(y)

        if(y==null){
           return res.status(409).json({message:"invalid task/ Task not found"})
        }

        scheduleReminders(id, task_name, foundUser.email, reminders, deadline)
        return res.status(200).json({ "message": "Edited and updated." })

    } catch (error) {
        console.log(error);
        res.status(500).json({ "message": "Internal server error" })
    }
})

router.get("/view", isAuthenticated, async (req, res) => {
    try {
        let findEmail = await User.findOne({ _id: req.payload.id })

        if (!findEmail) {
            res.status(400).json({ message: "Auth failed." })
        }

        let id = findEmail._id;

        let utasks = await Task.find({ user: id })

        res.status(200).json(utasks);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" })
    }
})

export default router;

