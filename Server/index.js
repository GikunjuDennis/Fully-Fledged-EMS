import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/adminRoute.js";

//create instance 
const app = express()

//Middlware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true
}))
app.use(express.json()) // transfer data to the json format when parsing from frontend
app.use('/auth', adminRouter)


//Assign a port number
const PORT = 3000;
app.listen(PORT, () => {
    console.log("sever is running")
})