import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchData, getIngredientDetails } from "../components/dataFetch";
import { convertGelToUsd } from "../services/exchange";

const DetailsContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 20px;
  background-color: #deb887;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Georgia", serif;
  color: #4b2e2e;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin: 20px 0;
  color: #4b2e2e;
  border-bottom: 2px solid #8b4513;
  padding-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #4b2e2e;

  strong {
    color: #8b4513;
  }
`;

const Button = styled.button`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #8b4513;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #5a2d0c;
  }
`;

const Details = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [convertedPrice, setConvertedPrice] = useState(null);
  const [isUsd, setIsUsd] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const { products, ingredients } = await fetchData(
        import.meta.env.VITE_API_URL,
        import.meta.env.VITE_API_KEY
      );
      const product = products.find((p) => p._uuid === id);
      setProduct(product);
      setIngredients(ingredients);
    };

    fetchProductDetails();
  }, [id]);

  const handleConvert = async () => {
    if (product) {
      const gelAmount = parseFloat(product.totalPrice.replace(/[^\d.-]/g, ""));
      if (isUsd) {
        setConvertedPrice(product.totalPrice);
        setIsUsd(false);
      } else {
        const usdAmount = await convertGelToUsd(gelAmount);
        setConvertedPrice(`$${usdAmount.toFixed(2)}`);
        setIsUsd(true);
      }
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const { description, flavor, strength } = getIngredientDetails(
    product.selectedIngredients,
    ingredients
  );

  return (
    <DetailsContainer>
      <Title>{product.title}</Title>
      <Paragraph>
        <strong>Price:</strong> {convertedPrice || product.totalPrice}
      </Paragraph>
      <Paragraph>
        <strong>Description:</strong> {description}
      </Paragraph>
      <Paragraph>
        <strong>Strength:</strong> {strength}
      </Paragraph>
      <Paragraph>
        <strong>Status:</strong> {product.caffeine}
      </Paragraph>
      <Paragraph>
        <strong>Flavor:</strong> {flavor}
      </Paragraph>
      <Paragraph>
        <strong>Country:</strong> {product.country}
      </Paragraph>
      <Button onClick={handleConvert}>
        {isUsd ? "Convert to GEL" : "Convert to USD"}
      </Button>
    </DetailsContainer>
  );
};

export default Details;
