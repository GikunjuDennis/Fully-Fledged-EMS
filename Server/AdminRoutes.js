//Indicate all routes related to the Admin
import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/adminlogin", (req, res) => {
    //check credentials with the db
    const sql = "SELECT * from admin Where email = ? and password = ?";

    //use imported db con to run query
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
         return res.json({ loginStatus: false, Error: "Database query error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            //Authentication
            //Generate token 
            const token = jwt.sign(
                { role: "admin", email: email}, 
                "jwt_secret_key", 
                {expiresIn: '1d'}
            );
            //Store token in browser cookies
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        }  else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

router.get('/category', (req, res)=> {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"})
        return res.json({Status: true, Result : result}) 
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"});
        return res.json({Status: true, Result: result});
    });
});

export {router as adminRouter}