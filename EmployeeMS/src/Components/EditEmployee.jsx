import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'


const EditEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        category_id: "",
        role: "",
        salary: "",
        address: "",
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
        .catch(err => console.log(err))
        axios.get('http://localhost:3000/auth/employee/'+ id)
        .then(result => {
           setEmployee({
            ...employee,
            name: result.data.Result[0].name,
            email: result.data.Result[0].email,
            category_id: result.data.Result[0].category_id,
            role: result.data.Result[0].role,
            salary: result.data.Result[0].salary,
            address: result.data.Result[0].address,
           })
        }).catch(err => console.log(err))
    }, [])  

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/auth/edit_employee/' + id, employee)
        .then(result => {
            if(result.data.Status){
                navigate('/dashboard/employee')
            }else {
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
            <label htmlFor="inputname" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputname"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail"
              placeholder="Enter Email"
              value={employee.email}
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select" onChange={(e) => setEmployee({...employee, category_id: e.target.value})}>
              {category.map((c) => {
                return (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-12">
            <label htmlFor="inputRole" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputRole"
              placeholder="Enter Role"
              value={employee.role}
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, role: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              value={employee.salary}
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({ ...employee, image: e.target.files[0] })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="address"
              className="form-control rounded-0"
              id="address"
              placeholder="Enter Address"
              value={employee.address}
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
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