import React, { useState } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [editId, setEditId] = useState(null);

  function save(e) {
    e.preventDefault();

    if (editId !== null) {
      setEmployees(employees.map(emp =>
        emp.id === editId ? { ...emp, name, salary } : emp
      ));
      setEditId(null);
    } else {
      setEmployees([...employees, {
        id: Date.now(), name, salary
      }]);
    }

    setName('');
    setSalary('');
  }

  function edit(emp) {
    setEditId(emp.id);
    setName(emp.name);
    setSalary(emp.salary);
  }

  function remove(id) {
    setEmployees(employees.filter(emp => emp.id !== id));
  }

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">

        <h1 className="text-2xl font-bold text-blue-600 text-center mb-5">
          Employee Management
        </h1>

        <form onSubmit={save}>
          <input
            className="border p-2 w-full mb-3 rounded"
            placeholder="Employee Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <input
            className="border p-2 w-full mb-3 rounded"
            type="number"
            placeholder="Salary"
            value={salary}
            onChange={e => setSalary(e.target.value)}
            required
          />

          <button className="bg-blue-600 text-white p-2 w-full rounded">
            {editId !== null ? 'Update Employee' : 'Add Employee'}
          </button>
        </form>

        <h2 className="text-xl font-bold mt-5 mb-3">
          Employee List
        </h2>

        {employees.map(emp => (
          <div key={emp.id}
            className="bg-blue-100 p-3 mb-3 rounded">

            <p className="font-bold">{emp.name}</p>
            <p>Salary: ₹{emp.salary}</p>

            <button
              onClick={() => edit(emp)}
              className="bg-green-600 text-white px-3 py-1 mt-2 mr-2 rounded">
              Edit
            </button>

            <button
              onClick={() => remove(emp.id)}
              className="bg-red-500 text-white px-3 py-1 mt-2 rounded">
              Delete
            </button>

          </div>
        ))}

        {employees.length === 0 && (
          <p className="text-gray-500">No employees found.</p>
        )}

      </div>
    </div>
  );
}

export default App;