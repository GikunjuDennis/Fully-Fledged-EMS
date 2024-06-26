import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployee(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    console.log("Deleting ID:", id);
    axios.delete('http://localhost:3000/auth/delete_employee/' +id)
    .then(result => {
      if (result.data.Status) {
          console.log("Delete successful");
          window.location.reload() //will reload the page after the delete
      }else {
        alert(result.data.Error)
      }
    })
  }

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Employee List</h3>
      </div>
      <Link to="/dashboard/add_employee" className="btn btn-success">
        Add Employee
      </Link>
      <div className="mt-3">
        <table className="table">
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
            {employee.map((c,index) => 
              (
              
              <tr key={index}>
                
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.category_id}</td>
                <td>{c.role}</td>
                <td>{c.salary}</td>
                <td>
                  <img
                    src={`http://localhost:3000/Public/Images/${c.image}`}
                    className="employee_image"
                    alt=""
                  />
                </td>
                <td>{c.address}</td>
                <td>
                  <Link to={`/dashboard/edit_employee/` + c.id} className="btn btn-info btn-sm me-2">Edit</Link>
                  <button className="btn btn-warning btn-sm"onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default Employee;
