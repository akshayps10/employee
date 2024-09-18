import React, { useState, useEffect } from 'react';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  
  useEffect(() => {
    fetchEmployees();
  }, []);

 
  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:5000/employees');
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };


  const addEmployee = async (employee) => {
    if (employee.id) {
     
      await fetch(`http://localhost:5000/employees/${employee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...employee,
          updatedAt: new Date().toLocaleString(),
        }),
      });

      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) => (emp.id === employee.id ? employee : emp))
      );
    } else {
     
      const maxId = employees.length > 0 ? Math.max(...employees.map((emp) => emp.id)) : 0;
      const newId = maxId + 1;

      const response = await fetch('http://localhost:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...employee,
          id: newId, 
          createdAt: new Date().toLocaleString(),
        }),
      });

      const newEmployee = await response.json();
      setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
    }

    setSelectedEmployee(null); 
  };

 
  const editEmployee = (employee) => {
    setSelectedEmployee(employee);
  };


  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:5000/employees/${id}`, {
      method: 'DELETE',
    });

    setEmployees((prevEmployees) => prevEmployees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Employee Management</h1>
      <EmployeeForm onSave={addEmployee} selectedEmployee={selectedEmployee} />
      <EmployeeList 
        employees={employees} 
        onEdit={editEmployee} 
        onDelete={deleteEmployee} 
      />
    </div>
  );
};

export default App;
