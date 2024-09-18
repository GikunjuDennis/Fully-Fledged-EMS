import express from 'express';
import con from '../Utils/Db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const Router = express.Router();

Router.post("/employee_login", (req, res) => {
    // Check credentials with the db
    const sql = "SELECT * from employee Where email = ?";

    // Use imported db con to run query
    con.query(sql, [req.body.email], (err, result) => {
        if (err) {
            console.error("Database query error:", err);
            return res.json({ loginStatus: false, Error: "Database query error" });
        }
        if (result.length > 0) {
            const email = result[0].email;
            const hash = result[0].password; // Get the hashed password from the db
            // Verify password
            bcrypt.compare(req.body.password, hash, (err, match) => {
                if (err) {
                    console.error("Password comparison error:", err);
                    return res.json({ loginStatus: false, Error: "Password comparison error" });
                }
                if (match) {
                    // Authentication
                    // Generate token 
                    const token = jwt.sign(
                        { role: "employee", email: email, id: result[0].id }, 
                        "jwt_secret_key", 
                        { expiresIn: '1d' }
                    );
                    // Store token in browser cookies
                    res.cookie('token', token);
                    return res.json({ loginStatus: true, id: result[0].id });
                } else {
                    return res.json({ loginStatus: false, Error: "Wrong email or password" });
                }
            });
        } else {
            return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
    });
});

//API to get employee details
Router.get('/detail/:id', (req,res) => {
    const id  = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?"
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false})
            return res.json(result)
    })
})
// API to logout
Router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: true });
})

// Route to get leave requests for an employee
Router.get('/my_leaves', verifyUser, (req, res) => {
    const employee_id = req.id; // Get the employee ID from token

    const sql = "SELECT * FROM leave_requests WHERE employee_id = ?";
    con.query(sql, [employee_id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Database query error" });
        return res.json({ Status: true, Result: result });
    });
});

export { Router as EmployeeRouter };