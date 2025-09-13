import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductDetails } from "../features/products/productsSlice";
import { addItemToCart } from "../features/cart/cartSlice";
import { RootState, AppDispatch } from "../store";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  const addToCartHandler = () => {
    if (product) {
      dispatch(addItemToCart({ ...product, qty: 1 }));
    }
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h2>{product?.name}</h2>
          <p>{product?.description}</p>
          <p>Price: ${product?.price}</p>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
