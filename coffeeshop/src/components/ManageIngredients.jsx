import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'ingredients_list';

function ManageIngredients() {
  const [ingredients, setIngredients] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedIngredients = localStorage.getItem(STORAGE_KEY);
    if (storedIngredients) {
      try {
        setIngredients(JSON.parse(storedIngredients));
      } catch (e) {
        console.error('Failed to parse localStorage data:', e);
        setIngredients([]);
      }
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ingredients));
  }, [ingredients]);

  const handleAdd = () => {
    const name = prompt('Enter ingredient name:');
    if (!name) return;

    const price = prompt('Enter ingredient price:');
    if (!price) return;

    const strength = prompt('Enter strength (Low / Medium / High):');
    if (!strength) return;

    const flavor = prompt('Enter flavor (e.g., Fruity, Earthy, Sweet):');
    if (!flavor) return;

    // Find max numeric ID
    const numericIds = ingredients.map(i => Number(i.id)).filter(n => !isNaN(n));
    const maxId = numericIds.length > 0 ? Math.max(...numericIds) : 0;
    const newId = maxId + 1;

    const newIngredient = {
      id: String(newId),
      name,
      price,
      strength,
      flavor,
    };

    setIngredients([...ingredients, newIngredient]);
  };

  const handleDelete = (id) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleEdit = (id) => {
    const ingToEdit = ingredients.find(ing => ing.id === id);
    if (!ingToEdit) return;

    const name = prompt('Edit name:', ingToEdit.name);
    if (!name) return;

    const price = prompt('Edit price:', ingToEdit.price);
    if (!price) return;

    const strength = prompt('Edit strength (Low / Medium / High):', ingToEdit.strength);
    if (!strength) return;

    const flavor = prompt('Edit flavor:', ingToEdit.flavor);
    if (!flavor) return;

    const updatedIngredient = {
      ...ingToEdit,
      name,
      price,
      strength,
      flavor,
    };

    setIngredients(ingredients.map(ing => ing.id === id ? updatedIngredient : ing));
  };

  return (
    <div className="container">
      <h1>Manage Ingredients</h1>
      <button onClick={handleAdd}>Add New Ingredient</button>

      {ingredients.length === 0 ? (
        <p>No ingredients added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Price</th><th>Strength</th><th>Flavor</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map(ing => (
              <tr key={ing.id}>
                <td>{ing.id}</td>
                <td>{ing.name}</td>
                <td>{ing.price}</td>
                <td>{ing.strength}</td>
                <td>{ing.flavor}</td>
                <td>
                  <button onClick={() => handleEdit(ing.id)}>Edit</button>
                  <button onClick={() => handleDelete(ing.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageIngredients;
