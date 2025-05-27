export const fetchData = async (apiUrl, apiKey) => {
    try {
      const coffeeResponse = await fetch(`${apiUrl}/coffee`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (!coffeeResponse.ok) {
        throw new Error(`HTTP error! status: ${coffeeResponse.status}`);
      }
      const coffeeData = await coffeeResponse.json();
  
      const ingredientsResponse = await fetch(`${apiUrl}/ingredients`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });
      if (!ingredientsResponse.ok) {
        throw new Error(`HTTP error! status: ${ingredientsResponse.status}`);
      }
      const ingredientsData = await ingredientsResponse.json();
  
      return {
        products: coffeeData.items,
        ingredients: ingredientsData.items
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { products: [], ingredients: [] };
    }
  };
  
  export const mergeDetails = (details, keywords) => {
    const uniqueDetails = [...new Set(details.flatMap(detail => detail.split(", ").filter(d => keywords.includes(d.toLowerCase()))))];
    return uniqueDetails.length > 0 ? uniqueDetails.join(", ") : "None";
  };
  
  export const getIngredientDetails = (selectedIngredients, ingredients) => {
    const details = selectedIngredients.map(ingredientName => {
      const ingredient = ingredients.find(ing => ing.name === ingredientName);
      return ingredient ? ingredient : {};
    });
    return {
      description: details.map(ing => ing.description).filter(desc => desc).join(", "),
      flavor: mergeDetails(details.map(ing => ing.flavor), ["sweet", "fragrant", "vanilla", "chocolatey", "smooth", "creamy", "bitter"]),
      strength: mergeDetails(details.map(ing => ing.strength), ["bold", "rich", "low", "medium", "high"])
    };
  };