import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EmployeeForm = ({ onSave, selectedEmployee }) => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    status: 'active',
    createdAt: ''
  });

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee);
    } else {
     
      setEmployee({
        name: '',
        email: '',
        status: 'active',
        createdAt: ''
      });
    }
  }, [selectedEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (employee.name && employee.email) {
      
      if (!employee.id) {
        employee.createdAt = new Date().toLocaleString();
      }
      onSave(employee);
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className="form-control"
          value={employee.name}
          onChange={handleChange}
          placeholder="Name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          value={employee.email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">Status</label>
        <select
          id="status"
          name="status"
          className="form-select"
          value={employee.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success">Save</button>
    </form>
  );
};

export default EmployeeForm;
