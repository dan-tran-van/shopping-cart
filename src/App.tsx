import { useState, useEffect } from "react";
import "./App.css";
import { Home } from "./components/home/Home";
import { Routes, Route } from "react-router-dom";
import { ProductPage } from "./components/product/Product";
import { NoMatch } from "./components/NoMatch";
import { ProductAddPage } from "./components/product/ProductAddPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="product">
        <Route path=":productId" element={<ProductPage />}></Route>
        <Route path="add" element={<ProductAddPage />}></Route>
      </Route>
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

export default App;
