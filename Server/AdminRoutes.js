//Indicate all routes related to the Admin
import express from 'express';
import con from './Utils/Db.js';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

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

//Route to get the categories 
router.get('/category', (req, res)=> {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"})
        return res.json({Status: true, Result : result}) 
    })
})

//Route to add a new category
router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)";
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"});
        return res.json({Status: true, Result: result});
    });
});

//Configure multer for Image Upload
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
    cb(null, 'Public/Images') //Destination folder
   },
   filename: (req, file, cb) =>{
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }
})

//initailize multer with the configured storage
const upload = multer({ storage: storage })

//Route to add a new employee
router.post('/add_employee', upload.single('image'), (req, res) => {
    //Extract employee data from the request body
    const { name, email, category, role, salary, address } = req.body;
    //Get the filename of the uploaded image
    const image = req.file ? req.file.filename : null;

    //Log the received data for debugging
    console.log("Received Data:", { name, email, category, role, salary, image, address });
    // Prepare the values for the SQL query
    const values = [name, email, category, role, salary, image, address];
    // SQL query to insert a new employee
    const sql = 'INSERT INTO employee (name, email, category, role, salary, image, address) VALUES (?)';
    //Execute the query
    con.query(sql, [values], (err, result) => {
        if (err) return res.json({status: false, Error: err});
        return res.json({Status: true, Result: result});
    });

});

//Route to get the employees
router.get('/employee', (req, res)=> {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"})
        return res.json({Status: true, Result : result}) 
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id; 
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id] ,(err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"})
        return res.json({Status: true, Result : result}) 
    }) 
})

//Route to edit/update employee
router.put('/edit_employee/:id', (req,res) => {
    const id = req.params.id;
    const sql = 'UPDATE employee set name= ?, email= ?, category_id= ?, role= ?, salary= ?, address= ? where id = ?'
        const values = [
            req.body.name,
            req.body.email,
            req.body.address,
            req.body.category_id,
            req.body.role,
            req.body.salary,
        ]

    con.query(sql,[...values, id], (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"+ err})
        return res.json({Status: true, Result : result});
    });
});

//Route to delete an Employee record
router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"+ err})
        return res.json({Status: true, Result : result});
    });
});

//Admin Counter
router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"+ err})
        return res.json({Status: true, Result : result});
    });
});

//Employee Counter
router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"+ err})
            console.log(result);
        return res.json({Status: true, Result : result});
    });
});

//Salary Counter
router.get('/salary_count', (req, res) => {
    const sql = "SELECT SUM (salary) as salary from employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"+ err})
        return res.json({Status: true, Result : result});
    });
});

//Route to get Admin Records
router.get('/admin_records', (req, res) => {
    const sql = "SELECT * from admin"
    con.query(sql, (err, result) => {
        if (err) return res.json({status: false, Error: "Database query error"+ err})
        return res.json({Status: true, Result : result});
    });
});


export {router as adminRouter}