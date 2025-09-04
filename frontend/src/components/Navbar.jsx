import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

function Navbar({ onSearch }) {
  const { cart } = useContext(CartContext);

  // 🔹 Calculate total items in cart
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  // 🔹 State to trigger animation
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);

      // remove animation after it finishes (0.5s)
      const timer = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">🛒 MyStore</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart{" "}
                <span
                  className={`badge bg-success ${animate ? "bounce" : ""}`}
                >
                  {totalItems}
                </span>
              </Link>
            </li>
          </ul>

          <form
            className="d-flex"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search products..."
              onChange={(e) => onSearch(e.target.value)}
            />
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
