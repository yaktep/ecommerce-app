import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../features/products/productsSlice";
import { RootState, AppDispatch } from "../store";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const signOutHandler = () => {
    localStorage.removeItem("userInfo"); // Clear user info from storage
    window.location.reload(); // Reload to reset state and redirect to the login page
  };

  return (
    <div>
      <header className="header">
        {/* Welcome Message */}
        <div className="welcome-message">
          {userInfo ? (
            <h3>Welcome, {userInfo.name}!</h3>
          ) : (
            <h3>Welcome to ShopEase!</h3>
          )}
        </div>

        <h1>Discover our best products at the best prices</h1>
      </header>

      <div className="action-buttons">
        {/* Conditional Rendering for Login/Signup from me */}
        {!userInfo ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        ) : (
          <>
            <button onClick={signOutHandler}>Sign Out</button>
          </>
        )}

        {/* View Cart Button */}
        <Link to="/cart">
          <button>View Cart</button>
        </Link>
      </div>

      <main className="main">
        <h2 style={{ textAlign: "center", margin: "20px 0" }}>
          Featured Products
        </h2>
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : (
          <div className="featured-products">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <Link
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price.toFixed(2)}</p>
                </Link>
                <button
                  onClick={() => {
                    // Implement 'Add to Cart' logic here
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
