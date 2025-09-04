import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h1>🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "15px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "80px", height: "80px", objectFit: "contain", borderRadius: "8px" }}
              />

              {/* Product Details */}
              <div style={{ flex: "1" }}>
                <h3 style={{ margin: 0, fontSize: "16px" }}>{item.title}</h3>
                <p style={{ margin: "5px 0" }}>₹{(item.price * 80).toFixed(0)}</p>
              </div>

              {/* Quantity Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <button
                  onClick={() => updateQuantity(item.id, item.qty - 1)}
                  disabled={item.qty <= 1}
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
                <span>{item.qty}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.qty + 1)}
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

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: "6px 12px",
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total + Clear Cart */}
          <h2>Total: ₹{(total * 80).toFixed(0)}</h2>
          <button
            onClick={clearCart}
            style={{
              padding: "10px 15px",
              background: "darkred",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
