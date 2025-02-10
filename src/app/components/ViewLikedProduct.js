"use client"

import { useEffect } from "react"
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Liked Products</h2>
      <div className={styles.cartContainer}>
        <div className={styles.itemList}>
          {likedProducts.length > 0 ? (
            likedProducts.map((item) => (
              <div key={item._id} className={styles.item}>
                <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImage} />
                <div className={styles.itemInfo}>
                  <h3 className={styles.itemName}>{item.productname || item.name}</h3>
                  <p className={styles.itemPrice}>₹{item.price.toFixed(2)}</p>
                  <button className={styles.removeButton} onClick={() => handleRemoveLiked(item._id)}>
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
  )
}

