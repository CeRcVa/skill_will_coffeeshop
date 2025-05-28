import React, { useState, useEffect } from 'react';
import './ManageIngredients.css';

function ManageIngredients() {
  const [ingredients, setIngredients] = useState(() => {
    const saved = localStorage.getItem('ingredients');
    return saved ? JSON.parse(saved) : [];
  });

  const [newIngredient, setNewIngredient] = useState({
    name: '',
    price: '',
    description: '',
    strength: 'Low',
    flavor: '',
  });

  useEffect(() => {
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
  }, [ingredients]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewIngredient((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddIngredient = () => {
    const id = `ing_${Date.now()}`;
    setIngredients((prev) => [...prev, { id, ...newIngredient, price: parseFloat(newIngredient.price) }]);
    setNewIngredient({ name: '', price: '', description: '', strength: 'Low', flavor: '' });
  };

  return (
    <div className="manage-ingredients-container">
      <h2 className="section-title">Add New Ingredient</h2>

      <div className="form-row">
        <div className="form-group">
          <label>Ingredient Name</label>
          <input name="name" value={newIngredient.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input name="price" type="number" value={newIngredient.price} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group full-width">
        <label>Description</label>
        <textarea name="description" value={newIngredient.description} onChange={handleChange} />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Strength</label>
          <select name="strength" value={newIngredient.strength} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Flavor Profile</label>
          <input name="flavor" value={newIngredient.flavor} onChange={handleChange} />
        </div>
      </div>

      <button onClick={handleAddIngredient} className="add-button">
        Add Ingredient
      </button>

      <h3 className="ingredients-title">Current Ingredients</h3>
      <ul className="ingredient-list">
        {ingredients.map((ing) => (
          <li key={ing.id}>
            {ing.name} - ${ing.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageIngredients;
