import express from "express";
import cors from 'cors'
import { adminRouter } from "./Routes/AdminRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

//create instance 
const app = express()

//Middlware
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(express.json()) // transfer data to the json format when parsing from frontend
app.use(cookieParser());
app.use('/auth', adminRouter);
app.use('/employee', EmployeeRouter);
app.use(express.static('Public'));

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        jwt.verify(token, "jwt_secret_key", (err ,decoded) => {
            if(err) return res.json({Status: false, Error: "Wromg Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        });
    } else {
        return res.json({Status: false ,Error: "Not Authenticated"})
    }
}
app.get('/verify', verifyUser, (req, res) =>{
    return res.json({Status: true, role: req.role, id: req.id})
} )
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