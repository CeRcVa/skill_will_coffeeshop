import React from "react";

const Footer = () => {  return( <footer>
    <div className="footer-container">
      <div className="footer-logo">
        <h1>
          Coffee<span>Shop</span>
        </h1>
        <p>Your daily dose of energy and joy!</p>
      </div>
      <div className="footer-links">
        <h3>Quick Links</h3>
        <a href="#first-section1">Home</a>
        <a href="#second-section2">catalog</a>
        <a href="#third-section">Favorite</a>
        <a href="#section4">ingredients</a>
      </div>
      <div className="footer-contact">
        <h3>Contact Us</h3>
        <p>Email: info@coffeeshop.com</p>
        <p>Phone: +123 456 7890</p>
        <p>Address: 123 Coffee St., Brew City</p>
      </div>
      <div className="footer-social">
        <h3>Follow Us</h3>
        <div className="social-icons">
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2025 CoffeeShop. All rights reserved.</p>
    </div>
  </footer>
);
};

export default Footer;