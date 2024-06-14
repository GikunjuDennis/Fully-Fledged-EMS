import express from "express";
import cors from 'cors'
import { adminRouter } from "./AdminRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

//create instance 
const app = express()

//Middlware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json()) // transfer data to the json format when parsing from frontend
app.use('/auth', adminRouter)
// Serve static files from the "Public" directory
// Resolve __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//app.use(express.static('Public'))


//Assign a port number
const PORT = 3000;
app.listen(PORT, () => {
    console.log("sever is running")
})