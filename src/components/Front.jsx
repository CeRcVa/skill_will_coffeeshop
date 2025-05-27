import React, { useEffect, useState } from "react";
import "./front.css";
import { fetchData, getIngredientDetails } from "./dataFetch";
import { Link } from "react-router-dom";

const Front = () => {
  const [products, setProducts] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { products, ingredients } = await fetchData(import.meta.env.VITE_API_URL, import.meta.env.VITE_API_KEY);
      setProducts(products);
      setIngredients(ingredients);
    };

    fetchProducts();
  }, []);

  if (!Array.isArray(products) || !Array.isArray(ingredients)) {
    return <div>Error: Product or ingredient data is not available.</div>;
  }

  const productRows = products.map((product, index) => {
    const { description, flavor, strength } = getIngredientDetails(product.selectedIngredients, ingredients);

    return (
      <tr className="product-row" key={index}>
        <td className="product-name">{product.title}</td>
        <td className="product-price">{product.totalPrice}</td>
        <td className="product-description">{description}</td>
        <td className="product-strength">{strength}</td>
        <td className="product-status">{product.caffeine}</td>
        <td className="product-flavor">{flavor}</td>
        <td className="product-country">{product.country}</td>
        <td className="product-seemore">
          <Link to={`/details/${product._uuid}`}>see more</Link>
        </td>
      </tr>
    );
  });

  return (
    <>
      <section className="first-section1" id="first-section1">
        <div className="first-section">
          <div className="background container ">
            <h1>Start a great day with a good Coffee</h1>
            <p>
              At Brew Haven, we believe every cup tells a story. From the rich
              aroma of freshly ground beans to the warm embrace of your favorite
              latte, we’re here to make every sip unforgettable. Whether you're
              here for a quick espresso, a cozy corner to work, or just a moment
              to unwind, our baristas are ready to serve you with a smile.
            </p>
          </div>
        </div>
        <div className="second-section">
          <h2>Enjoy our Coffee</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at
            adipiscing faucibus lacus tellus euismod. Dictum etiam urna turpis
            volutpat et nulla.
          </p>
          <a href="#">Order NOW!</a>
        </div>
        <div className="images">
          <img src="./coffe2.jpg" alt="Image1" />
          <img src="./coffe3.avif" alt="Image2" />
        </div>
      </section>
      <section className="second-section2" id="second-section2">
        <div className="wrap">
          <div className="line">
            <h2>Become Club Member for Special Offer!</h2>
          </div>
          <img src="./cofe01.svg" alt="" />
          <h1>Free Membership Card !!</h1>
          <div className="line2">
            <h2>Click Here For Registration</h2>
          </div>
        </div>
      </section>
      <section className="third-section" id="third-section">
        <div className="customers-favorite">
          <div className="container3">
            <div className="imgs">
              <img src="./coffee4.png" alt="" />
              <img src="./cofe5.jpg" alt="" />
              <img src="./cofe12.svg" alt="" />
              <img src="./cofe02.svg" alt="" />
            </div>
            <div className="column">
              <h2>Customers' Favorites</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tortor
                tincidunt sagittis nullam vel nec, id sodales elementum.
              </p>
              <a href="#section4">See Menu!</a>
            </div>
          </div>
        </div>
        <div className="size">
          <img src="./cofee20.svg" alt="" />
        </div>
      </section>
      <section className="section4" id="section4">
        <table className="product-table">
          <thead>
            <tr className="product-header">
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Strength</th>
              <th>Status</th>
              <th>Flavor</th>
              <th>Country</th>
              <th>See More</th>
            </tr>
          </thead>
          <tbody>
            {productRows}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Front;
