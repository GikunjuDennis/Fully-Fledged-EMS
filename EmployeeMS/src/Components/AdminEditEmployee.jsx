import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
       
        Email: "",
        
      });

      const[category, setCategory] = useState([])
      const navigate = useNavigate()

      useEffect(() => {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status){
                setCategory(result.data.Result);
            } else {
                alert(result.data.Error)
            }
           
        })
        .catch(err => console.log(err))///employee_admin/:id
        axios.get('http://localhost:3000/auth/employee_admin/'+ id)
        .then(result => {
            console.log(result)
           setEmployee({
            ...employee,
           
            Email: result.data.Result[0].Email,
            
           })
        }).catch(err => console.log(err))
    }, [])  

    const handleSubmit = (e) => {
       
        e.preventDefault()///edit_admin_employee/:id
        axios.put('http://localhost:3000/auth/edit_admin_employee/' + id, employee)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/employee')
            }else {
                console.log(result.data.Error)
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              value={employee.Email}
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, Email: e.target.value })}
            />
          </div>
          
          
         
          
          
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Edit Employee
          </button>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee;