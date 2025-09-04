import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function Products({ searchTerm }) {
  const { cart, addToCart, updateQuantity } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [hovered, setHovered] = useState(null);

  // ✅ Fetch products from Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Find product qty if already in cart
  const getQty = (id) => {
    const item = cart.find((p) => p.id === id);
    return item ? item.qty : 0;
  };

  // ✅ Filter products based on search
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const qty = getQty(product.id);

            return (
              <div
                key={product.id}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "15px",
                  width: "220px",
                  textAlign: "center",
                  background: "#fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  position: "relative",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "180px",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
                <h3 style={{ fontSize: "16px", minHeight: "50px" }}>
                  {product.title}
                </h3>
                <p>₹{(product.price * 80).toFixed(0)}</p>
                <Link to={`/products/${product.id}`}>View Details</Link>
                <br />
                <br />

                {/* Show "Add to Cart" on hover if not in cart */}
                {hovered === product.id && qty === 0 && (
                  <button
                    onClick={() => addToCart(product)}
                    style={{
                      padding: "8px 12px",
                      background: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Add to Cart
                  </button>
                )}

                {/* Show qty controls if already in cart */}
                {qty > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => updateQuantity(product.id, qty - 1)}
                      disabled={qty <= 1}
                      style={{
                        padding: "5px 10px",
                        background: "#ddd",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ➖
                    </button>
                    <span>{qty}</span>
                    <button
                      onClick={() => updateQuantity(product.id, qty + 1)}
                      style={{
                        padding: "5px 10px",
                        background: "#ddd",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      ➕
                    </button>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p>Loading products...</p>
        )}
      </div>
    </div>
  );
}

export default Products;
