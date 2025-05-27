import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "../front-pages/About";
import Front from "../components/Front";
import Layout from "../components/Layout";
import Details from "../front-pages/Details";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Front />} />
          <Route path="/home" element={<Front />} />
          <Route path="/about" element={<About />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
