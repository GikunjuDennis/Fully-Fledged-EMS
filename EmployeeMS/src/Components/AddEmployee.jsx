import React from 'react'

const AddEmployee = () => {
   const[category, setCategory] = useState([])

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
    }, [])
  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
        <div className='p-3 rounded w-50 border'>           
            <h3 className="text-center">Add Employee</h3>
            <form className="row g-1">
                <div className='col-12'>
                 <label for="inputname"className="form-label">
                    Name
                 </label>
                <input type="text" 
                className='form-control rounded-0'
                id="inputname"
                placeholder="Enter Name"
                /> 
                </div>
                <div className='col-12'>
                 <label for="inputEmail"className="form-label">
                    Email
                 </label>
                <input 
                type="email" 
                className='form-control rounded-0'
                id="inputEmail"
                placeholder="Enter Email"
                autoComplete="off"
                /> 
                </div>
                <div className='col-12'>
                 <label for="inputCategory"className="form-label">
                    Category
                 </label>
                 <select name="category" id="category" className="form-select">
                     {category.map(c =>{
                        return <option value={c.name}>{c.name}</option>
                     })}
                 </select>
                <input 
                type="category" 
                className='form-control rounded-0'
                id="category"
                placeholder="Enter Department"              
                /> 
                </div>
                <div className='col-12'>
                <label for="inputRole"className="form-label">
                    Role
                 </label>
                <input 
                type="text" 
                className='form-control rounded-0'
                id="inputRole"
                placeholder="Enter Role"
                autoComplete="off"
                />
                </div>
                <div className='col-12'>
                 <label htmlFor="inputAddress"className="form-label">
                    Address
                 </label>
                <input 
                type="address" 
                className='form-control rounded-0'
                id="address"
                placeholder="Enter Address"
                autoComplete="off"
                /> 
                </div>                              
            <button className='btn btn-success w-100 rounded-0 mb-2'>Add Employee</button>
        </form>
    </div>
</div>
  );
};

export default AddEmployee
