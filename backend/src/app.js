import express from "express";
import dotenv from "dotenv";

import {createServer} from "node:http"
import { Server } from "socket.io";
import { initializeSocket } from "./controllers/socketmanager.js";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();
const server = createServer(app);
const io = initializeSocket(server);

app.set("port", (process.env.PORT));
app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb", extended:true}));

app.get("/", (req,res)=>
{
    res.send("hello");

})

const start = async ()=>
{
    app.set("mongo_user")
    const connectDB = await mongoose.connect(process.env.dburl);
    server.listen(app.get("port"), ()=>{
        console.log(`APP STARTED AT PORT NO. ${process.env.PORT}`);
        console.log(`MongoDB server Connected with Host: ${connectDB.connection.host}`);
    })
}

start();