"use client"

import { useEffect } from "react"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { loadLikedProducts, removeLikedProduct } from "../store/likedproductSlice"
import styles from "../cart/styleCart.module.css"

export function ViewLikedProduct() {
  const dispatch = useDispatch()
  const likedProducts = useSelector((state) => state.likedProducts.items)

  useEffect(() => {
    dispatch(loadLikedProducts())
  }, [dispatch])

  const handleRemoveLiked = (id) => {
    dispatch(removeLikedProduct(id))
  }

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
  

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Liked Products</h2>
      <div className={styles.cartContainer}>
        <div className={styles.itemList}>
          {likedProducts.length > 0 ? (
            likedProducts.map((item) => (
              <div className={styles.likedBtn}>
              <div key={item._id} className={styles.item}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.productname || item.name}</h3>
                  <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                </div> 
              </div>
              <button className={styles.removeButton} onClick={() => handleRemoveLiked(item._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
              </button>
              </div>
            ))
          ) : (
            <p>Your liked products list is empty.</p>
          )}
        </div>
      </div>
    </div>
  )
}

