import { Link } from "react-router-dom";

import { useContext } from "react";
import { CartContext } from "../context/CartContext";

// Example featured products (pick best-sellers or discounted ones)
const featured = [
  { id: 2, name: "Smartphone", price: 14999, img: "https://via.placeholder.com/400x250" },
  { id: 4, name: "Smartwatch", price: 4999, img: "https://via.placeholder.com/400x250" },
];

function Home() {
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      {/* 🔹 Hero Section with Bootstrap Carousel */}
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://via.placeholder.com/1200x400?text=Big+Sale+50%25+Off"
              className="d-block w-100"
              alt="Sale Banner"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1200x400?text=New+Arrivals"
              className="d-block w-100"
              alt="New Arrivals"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://via.placeholder.com/1200x400?text=Best+Deals"
              className="d-block w-100"
              alt="Best Deals"
            />
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* 🔹 Featured Products */}
      <div style={{ padding: "40px" }}>
        <h2 className="text-center mb-4">🔥 Featured Products</h2>
        <div className="d-flex justify-content-center gap-4 flex-wrap">
          {featured.map((p) => (
            <div
              key={p.id}
              className="card"
              style={{ width: "18rem", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            >
              <img src={p.img} className="card-img-top" alt={p.name} />
              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">₹{p.price}</p>
                <Link to={`/products/${p.id}`} className="btn btn-outline-primary me-2">
                  View
                </Link>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
