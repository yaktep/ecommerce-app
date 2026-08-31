import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../features/products/productsSlice";
import { AppDispatch, RootState } from "../store";
import "../styles/ProductList.css";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product._id}>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <a href={`/product/${product._id}`}>View Details</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
