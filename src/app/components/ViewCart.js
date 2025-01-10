'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from './CartItem';

import styles from '../cart/styleCart.module.css';

export function ViewCart() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(storedCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    );
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Cart</h2>
      <div className={styles.cartContainer}>
        <div className={styles.itemList}>
          {items.length > 0 ? (
            items.map((item) => (
              <CartItem
                key={item.id} 
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
        <div className={styles.summary}>
          <div className={styles.totalRow}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalAmount}>₹{total.toFixed(2)}</span>
          </div>
          <button
  className={styles.placeOrderButton}
  onClick={() => {
   
    router.push(`/orderForm?total=${total}`);
  }}
  disabled={items.length === 0}
>
  Proceed to Checkout
</button>

        </div>
      </div>
    </div>
  );
}