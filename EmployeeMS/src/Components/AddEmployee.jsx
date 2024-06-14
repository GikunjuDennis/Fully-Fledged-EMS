import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    category_id: "",
    role: "",
    salary: "",
    image: "",
    address: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          console.log(result.data.Error)
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('category_id', employee.category_id);
    formData.append('role', employee.role);
    formData.append('salary', employee.salary);
    formData.append('image', employee.image);
    formData.append('address', employee.address);
    console.log("email: " + employee.email+ " name: "+ employee.name + " category: " + employee.category + " image: " + employee.image)

    axios.post('http://localhost:3000/auth/add_employee', formData)
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else{
          console.log(JSON.stringify(result.data))
            alert(result.data.Error);
        }
    })
    .catch(err => console.log(err))
}

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Employee</h3>
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
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            />
          </div>
          <div className="col-12">
            <label htmlFor="inputCategory" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select" value={employee.category} onChange={(e) => {
        {/*console.log(e.target.value);*/} // Log the selected value
        setEmployee({...employee, category_id: e.target.value});
      }}>
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
              placehiolder="Enter Salary"
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
              autoComplete="off"
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
            />
          </div>
          <button className="btn btn-success w-100 rounded-0 mb-2">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
