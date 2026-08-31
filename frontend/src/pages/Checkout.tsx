import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { clearCart } from "../features/cart/cartSlice";

const Checkout: React.FC = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const placeOrderHandler = () => {
    console.log("Order placed!");
    dispatch(clearCart());
  };

  return (
    <div>
      <h1>Checkout</h1>
      {cartItems.map((item) => (
        <div key={item.product}>
          <h3>{item.name}</h3>
          <p>Quantity: {item.qty}</p>
        </div>
      ))}
      <button onClick={placeOrderHandler}>Place Order</button>
    </div>
  );
};

export default Checkout;
