import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail"; // ✅ Import detail page

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Navbar onSearch={(text) => setSearchTerm(text)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products searchTerm={searchTerm} />} />
        <Route path="/products/:id" element={<ProductDetail />} /> {/* ✅ Product detail route */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
