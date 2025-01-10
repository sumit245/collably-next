'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from './CartItem';  // Assuming CartItem still needs to be used

import styles from '../cart/styleCart.module.css';

export function ViewLikedProduct() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(storedCart);
  }, []);

  const removeItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Liked Product</h2>
      <div className={styles.cartContainer}>
        <div className={styles.itemList}>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className={styles.item}>
                <img src={item.imageUrl} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>₹{item.price}</p>
                  <button 
                    className={styles.removeButton} 
                    onClick={() => removeItem(item.id)}>
                      Remove from Liked
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your liked products list is empty.</p>
          )}
        </div>
      </div>
    </div>


  );
}