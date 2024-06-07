import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Employee = () => {  
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/auth/employee')
        .then(result => {
            if(result.data.Status){
                setEmployee(result.data.Result);
            } else {
                alert(result.data.Error)
            }          
        })
        .catch(err => console.log(err))
  }, [])

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className='mt-3'>   
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Category</th>
                        <th>Role</th>
                        <th>Salary</th>
                        <th>Image</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employee.map(c => (
                            <tr>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.category}</td>
                                <td>{c.role}</td>
                                <td>{c.salary}</td>
                                <td><img src={`http://localhost:3000/Images/` + employee.image} className="employee_image" alt="" /></td>
                                <td>{c.address}</td>
                                <td>
                                  <button>Edit</button>
                                  <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  );
};

export default Employee;