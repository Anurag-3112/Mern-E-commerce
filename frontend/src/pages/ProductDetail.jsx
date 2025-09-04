import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <h2>Loading product...</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "300px", borderRadius: "10px" }}
      />
      <h2>₹{product.price}</h2>
      <p>{product.description}</p>
      <button
        onClick={() => addToCart(product)}
        style={{
          padding: "10px 15px",
          background: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetail;
