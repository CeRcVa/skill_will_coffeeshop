import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData, getIngredientDetails } from "../components/dataFetch";


const AboutPage = styled.div`
  font-family: "Georgia", serif;
  color: #4e342e;
  background: #f3ece7;
  padding: 2rem;
`;

const AboutIntro = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    color: #3e2723;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.5;
    color: #5d4037;
    max-width: 800px;
    margin: 0 auto;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #3e2723;
    margin-bottom: 1rem;
  }
`;

const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProductCard = styled.div`
  background: #deb887;
  border: 2px solid #d7ccc8;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  }

  h2 {
    font-size: 1.8rem;
    color: #3e2723;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    margin: 0.3rem 0;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  color: #d84315;
  font-size: 1.2rem;
  margin-top: 2rem;
`;


const About = () => {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchContent = async () => {
      const { products, ingredients } = await fetchData(
        import.meta.env.VITE_API_URL,
        import.meta.env.VITE_API_KEY
      );
      setProducts(products);
      setIngredients(ingredients);
    };

    fetchContent();
  }, []);

  if (!Array.isArray(products) || !Array.isArray(ingredients)) {
    return <ErrorMessage>Error: Data is not available.</ErrorMessage>;
  }

  return (
    <AboutPage>
      <AboutIntro>
        <h1>Welcome to Our Coffee World</h1>
        <p>
          Discover the finest selection of coffee products and the exquisite
          ingredients that make them unique. Each product and ingredient is
          crafted with care to deliver the ultimate coffee experience.
        </p>
      </AboutIntro>

      <Section>
        <h1>Our Coffee Products</h1>
        <ProductsContainer>
          {products.map((product, index) => {
            const { description, flavor, strength } = getIngredientDetails(
              product.selectedIngredients,
              ingredients
            );
            return (
              <ProductCard key={index}>
                <h2>{product.title}</h2>
                <p>{description}</p>
                <p>Flavor: {flavor}</p>
                <p>Strength: {strength}</p>
                <p>Price: {product.totalPrice}</p>
                <p>Country: {product.country}</p>
                <p>Caffeine Level: {product.caffeine}</p>
              </ProductCard>
            );
          })}
        </ProductsContainer>
      </Section>

      <Section>
        <h1>Our Ingredients</h1>
        <ProductsContainer>
          {ingredients.map((ingredient, index) => (
            <ProductCard key={index}>
              <h2>{ingredient.name}</h2>
              <p>{ingredient.description}</p>
              <p>Flavor: {ingredient.flavor}</p>
              <p>Strength: {ingredient.strength}</p>
              <p>Price: {ingredient.price}</p>
              <p>Country: {ingredient.country || "Unknown"}</p>
            </ProductCard>
          ))}
        </ProductsContainer>
      </Section>
    </AboutPage>
  );
};

export default About;
