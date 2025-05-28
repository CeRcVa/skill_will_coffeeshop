import React, { useState, useEffect } from "react";
import "./AddCoffee.css";

const AddCoffee = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newCoffee, setNewCoffee] = useState({
    name: "",
    country: "",
    description: "",
    imageUrl: "",
    price: "",
    caffeine: "",
    selectedIngredients: [],
  });

  useEffect(() => {
    const savedIngredients = localStorage.getItem("ingredients");
    setIngredients(savedIngredients ? JSON.parse(savedIngredients) : []);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCoffee((prev) => ({ ...prev, [name]: value }));
  };

  const handleIngredientSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setNewCoffee((prev) => ({ ...prev, selectedIngredients: selected }));
  };

  const handleAddCoffee = () => {
    const coffees = JSON.parse(localStorage.getItem("coffees") || "[]");

    const newEntry = {
      id: `coffee_${Date.now()}`,
      name: newCoffee.name,
      country: newCoffee.country,
      description: newCoffee.description,
      imageUrl: newCoffee.imageUrl,
      price: parseFloat(newCoffee.price),
      caffeine: parseFloat(newCoffee.caffeine),
      selectedIngredients: newCoffee.selectedIngredients,
    };

    coffees.push(newEntry);
    localStorage.setItem("coffees", JSON.stringify(coffees));

    // Reset form
    setNewCoffee({
      name: "",
      country: "",
      description: "",
      imageUrl: "",
      price: "",
      caffeine: "",
      selectedIngredients: [],
    });
  };

  return (
    <div className="add-coffee-container">
      <h2 className="add-coffee-title">Add New Coffee</h2>

      <div className="input-row">
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={newCoffee.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input name="country" value={newCoffee.country} onChange={handleChange} />
        </div>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={newCoffee.description} onChange={handleChange} />
      </div>

      <div className="input-row">
        <div className="form-group">
          <label>Image URL</label>
          <input
            name="imageUrl"
            value={newCoffee.imageUrl}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        <div className="form-group">
          <label>Price ($)</label>
          <input
            name="price"
            type="number"
            value={newCoffee.price}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label>Caffeine (mg)</label>
        <input
          name="caffeine"
          type="number"
          value={newCoffee.caffeine}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Ingredients</label>
        <select multiple value={newCoffee.selectedIngredients} onChange={handleIngredientSelect}>
          {ingredients.map((ing) => (
            <option key={ing.id} value={ing.id}>
              {ing.name} - ${ing.price.toFixed(2)}
            </option>
          ))}
        </select>
        <small>Hold Ctrl (Cmd on Mac) to select multiple</small>
      </div>

      <button onClick={handleAddCoffee}>Add Coffee</button>
    </div>
  );
};

export default AddCoffee;
