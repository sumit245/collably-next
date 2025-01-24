"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "./CartItem";
import { loadCart, updateQuantity, removeFromCart } from "../store/cartSlice";

import styles from "../cart/styleCart.module.css";

export function ViewCart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    try {
      dispatch(loadCart());
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  }, [dispatch]);

  const handleUpdateQuantity = (_id, newQuantity) => {
    try {
      if (newQuantity > 0) {
        dispatch(updateQuantity({ _id, quantity: newQuantity }));
      } else {
        console.warn("Quantity must be greater than 0.");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = (_id) => {
    try {
      dispatch(removeFromCart(_id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      router.push("/login");
    } else if (total > 0) {
      router.push(`/orderForm?total=${total}`);
    } else {
      console.warn("Cart is empty, cannot proceed to checkout.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Cart</h2>
      <div className={styles.cartContainer}>
        <div className={styles.itemList}>
          {items && items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity}
                onRemove={handleRemoveItem}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className={styles.summary}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalAmount}>₹{total?.toFixed(2) || "0.00"}</span>
          </div>
          <button
            className={styles.placeOrderButton}
            onClick={handleCheckout}
            disabled={!items || items.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
