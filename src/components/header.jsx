import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="logo">
          <a href="/home">
            <h1>
              Coffee<span>Shop</span>
            </h1>
          </a>
        </div>
        <div className="navbar">
          <a href="/home#first-section1">Home</a>
          <a href="/about">Catalog</a>
          <a href="/home#third-section">Favorite</a>
          <a href="/home#section4">Ingredients</a>
        </div>
        <div className="hamburger">
          <input type="checkbox" className="menu" id="menu" />
          <label htmlFor="menu">
            <i className="fa-solid fa-bars"></i>
          </label>
          <div className="sidebar-menu">
            <a href="/home#first-section1">Home</a>
            <a href="/about">Catalog</a>
            <a href="/home#third-section">Favorite</a>
            <a href="/home#section4">Ingredients</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;