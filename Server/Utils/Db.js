import mysql from 'mysql'

//Database connection configuration
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "employeems"
});

// Connect to the database
con.connect(function(err) {
    if(err) {
     console.error("Error connecting to database:", err);  //log the error
        //Hand the error appropriately
    }  else {
        console.log("Database connection successful");
    }
});

//export connection
export default con;