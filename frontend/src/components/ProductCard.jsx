import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductCard({ product }) {
  const { cart, addToCart, updateQuantity, removeFromCart } = useContext(CartContext);
  const [hovered, setHovered] = useState(false);

  // Check if product is already in cart
  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        textAlign: "center",
        transition: "0.3s",
        boxShadow: hovered ? "0px 4px 12px rgba(0,0,0,0.2)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={product.image} alt={product.name} width="150" height="150" />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>

      {/* If product is already in cart, show quantity controls */}
      {cartItem ? (
        <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
          <button
            onClick={() =>
              cartItem.qty > 1 ? updateQuantity(product.id, cartItem.qty - 1) : removeFromCart(product.id)
            }
          >
            ➖
          </button>
          <span>{cartItem.qty}</span>
          <button onClick={() => updateQuantity(product.id, cartItem.qty + 1)}>➕</button>
        </div>
      ) : (
        hovered && (
          <button
            onClick={() => addToCart(product)}
            style={{
              marginTop: "10px",
              padding: "8px 15px",
              background: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        )
      )}
    </div>
  );
}

export default ProductCard;
