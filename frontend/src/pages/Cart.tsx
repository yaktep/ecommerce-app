import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../store";
import { addItemToCart, removeItemFromCart } from "../features/cart/cartSlice";
import "../styles/Cart.css";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const changeQuantityHandler = (id: string, qty: number) => {
    const item = cartItems.find((item) => item.product === id);
    if (item) {
      dispatch(addItemToCart({ ...item, qty }));
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/products">Go Back to Products</Link>
        </p>
      ) : (
        <>
          <div>
            {cartItems.map((item) => (
              <div key={item.product}>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <div>
                  <button
                    onClick={() =>
                      changeQuantityHandler(item.product, item.qty - 1)
                    }
                    disabled={item.qty <= 1}
                  >
                    -
                  </button>
                  <span> Quantity: {item.qty} </span>
                  <button
                    onClick={() =>
                      changeQuantityHandler(item.product, item.qty + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeFromCartHandler(item.product)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div>
            <Link to="/products">
              <button style={{ marginTop: "20px" }}>Add More Items</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
