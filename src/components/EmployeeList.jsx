import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="container mt-5">
      <h2>Employee List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
          
            <th>Name</th> 
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
            
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
                <button className="btn btn-warning" onClick={() => onEdit(employee)}>Edit</button>
                <button className="btn btn-danger" onClick={() => onDelete(employee.id)}>
                 Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
