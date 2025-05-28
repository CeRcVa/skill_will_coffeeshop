import React, { useState, useEffect } from 'react';
import '../App.css';

const STORAGE_KEY = 'coffee_list';

function Dashboard() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    const storedCoffees = localStorage.getItem(STORAGE_KEY);
    if (storedCoffees) {
      try {
        setCoffees(JSON.parse(storedCoffees));
      } catch (e) {
        console.error('Failed to parse localStorage data:', e);
        setCoffees([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(coffees));
  }, [coffees]);

  const handleAdd = () => {
    const name = prompt('Enter coffee name:');
    if (!name) return;

    const origin = prompt('Enter coffee origin (country):');
    if (!origin) return;

    const caffeine = prompt('Enter caffeine amount (e.g., 120mg):');
    if (!caffeine) return;

    const price = prompt('Enter price (e.g., $4.99):');
    if (!price) return;

    const description = prompt('Enter coffee description:');
    if (!description) return;

    const numericIds = coffees.map(c => Number(c.id)).filter(n => !isNaN(n));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = maxId + 1;

    const newCoffee = {
      id: String(newId),
      name,
      origin,
      caffeine,
      price,
      description,
    };

    setCoffees([...coffees, newCoffee]);
  };

  const handleDelete = (id) => {
    setCoffees(coffees.filter(coffee => coffee.id !== id));
  };

  const handleEdit = (id) => {
    const coffeeToEdit = coffees.find(coffee => coffee.id === id);
    if (!coffeeToEdit) return;

    const name = prompt('Edit coffee name:', coffeeToEdit.name);
    if (!name) return;

    const origin = prompt('Edit coffee origin (country):', coffeeToEdit.origin);
    if (!origin) return;

    const caffeine = prompt('Edit caffeine amount (e.g., 120mg):', coffeeToEdit.caffeine);
    if (!caffeine) return;

    const price = prompt('Edit price (e.g., $4.99):', coffeeToEdit.price);
    if (!price) return;

    const description = prompt('Edit coffee description:', coffeeToEdit.description);
    if (!description) return;

    const updatedCoffee = {
      ...coffeeToEdit,
      name,
      origin,
      caffeine,
      price,
      description,
    };

    setCoffees(coffees.map(coffee => coffee.id === id ? updatedCoffee : coffee));
  };

  return (
    <div className="container">
      <h1>Coffee Dashboard</h1>
      <button onClick={handleAdd}>Add New Coffee</button>

      {coffees.length === 0 ? (
        <p>No coffees added yet.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Origin</th>
                <th>Caffeine</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coffees.map(coffee => (
                <tr key={coffee.id}>
                  <td>{coffee.id}</td>
                  <td>{coffee.name}</td>
                  <td>{coffee.origin}</td>
                  <td>{coffee.caffeine}</td>
                  <td>{coffee.price}</td>
                  <td>
                    <button>View</button>
                    <button onClick={() => handleEdit(coffee.id)}>Edit</button>
                    <button onClick={() => handleDelete(coffee.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2>Coffee Cards</h2>
          <div className="card-container">
            {coffees.map(coffee => (
              <div className="card" key={coffee.id}>
                <h3>{coffee.name}</h3>
                <p>{coffee.description.slice(0, 80)}...</p>
                <p><strong>Origin:</strong> {coffee.origin}</p>
                <p><strong>Caffeine:</strong> {coffee.caffeine}</p>
                <p><strong>Price:</strong> {coffee.price}</p>
                <button>View More</button>
                <button onClick={() => handleEdit(coffee.id)}>Edit</button>
                <button onClick={() => handleDelete(coffee.id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
