"use client"

import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { fetchProductById } from "../../store/productSlice"
import { addToCart, updateQuantity } from "../../store/cartSlice"
import { toggleLikeProduct } from "../../store/likedproductSlice"
import styles from "./ProductDetail.module.css"

// Create a safe context hook that won't throw errors
const useLikeContextSafe = () => {
  try {
    // Import dynamically to avoid the error during rendering
    const { useLikeContext } = require("../../actions/LikeContext")
    return useLikeContext()
  } catch (error) {
    // Return fallback values if context is not available
    return {
      cartCount: 0,
      setCartCount: () => {},
    }
  }
}

export default function ProductDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [localCartCount, setLocalCartCount] = useState(0)

  // Use our safe context hook
  const likeContext = useLikeContextSafe()

  // Get cart count and setter from context if available, otherwise use local state
  const cartCount = likeContext?.cartCount ?? localCartCount
  const setCartCount = useCallback(
    (newCount) => {
      if (likeContext?.setCartCount) {
        likeContext.setCartCount(newCount)
      } else {
        setLocalCartCount(newCount)
      }
    },
    [likeContext?.setCartCount],
  )

  const product = useSelector((state) => state.products.currentProduct)
  const isLoading = useSelector((state) => state.products.isLoading)
  const error = useSelector((state) => state.products.error)
  const cartItems = useSelector((state) => state.cart.items)
  const likedProducts = useSelector((state) => state.likedProducts.items)

  const isLiked = product && likedProducts.some((item) => item._id === product._id)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id))
    }
  }, [dispatch, id])

  const handleAddToCart = () => {
    if (!product) return

    const existingItem = cartItems.find((item) => item._id === product._id)

    if (existingItem) {
      dispatch(updateQuantity({ _id: product._id, quantity: existingItem.quantity + 1 }))
    } else {
      dispatch(
        addToCart({
          _id: product._id,
          name: product.brandId,
          productname: product.productname,
          productPhoto: product.productPhoto,
          price: product.price,
          quantity: 1,
        }),
      )
    }

    // Update cart count safely
    setCartCount(cartCount + 1)
  }

  const toggleLike = () => {
    if (!product) return

    dispatch(
      toggleLikeProduct({
        _id: product._id,
        name: product.brandId,
        productname: product.productname,
        price: product.price,
        image: product.productPhoto,
      }),
    )
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading product details...</div>
  }

  if (error) {
    return <div className={styles.error}>Error loading product: {error}</div>
  }

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>
  }

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productImageContainer}>
        <img
          src={product.productPhoto || "/placeholder.svg"}
          alt={product.productname}
          className={styles.productImage}
        />
      </div>

      <div className={styles.productInfo}>
        <h1 className={styles.productName}>{product.productname}</h1>
        <div className={styles.productCategory}>Category: {product.category}</div>
        <div className={styles.productPrice}>₹{product.price}</div>

        <div className={styles.productDescription}>
          <h3>Description</h3>
          <p>{product.description}</p>
        </div>

        <div className={styles.productAvailability}>
          <span className={product.quantity > 0 ? styles.inStock : styles.outOfStock}>
            {product.quantity > 0 ? "In Stock" : "Out of Stock"}
          </span>
          {product.quantity > 0 && <span className={styles.quantityAvailable}>({product.quantity} available)</span>}
        </div>

        <div className={styles.actionButtons}>
          <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={product.quantity <= 0}>
            Add to Cart
          </button>

          <button
            onClick={toggleLike}
            className={styles.wishlistButton}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill={isLiked ? "#FF487F" : "none"}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.425 3.16309L7.42572 3.16309C8.23152 3.1625 9.02673 3.36097 9.74429 3.74311C10.462 4.12532 11.0819 4.68065 11.5498 5.36416L12.3739 6.56782L13.1994 5.36518C14.1193 4.02521 15.6289 3.16309 17.325 3.16309C20.0904 3.16309 22.375 5.46924 22.375 8.36713C22.375 11.0944 20.7887 13.8178 18.5994 16.085C16.5479 18.2095 14.1098 19.7836 12.375 20.4586C10.6402 19.7836 8.20206 18.2095 6.15061 16.085C3.96128 13.8178 2.375 11.0944 2.375 8.36713C2.375 5.46924 4.65959 3.16309 7.425 3.16309Z"
                stroke="#FF487F"
                strokeWidth="2"
                fill={isLiked ? "#FF487F" : "none"}
              />
            </svg>
          </button>
        </div>

        <div className={styles.productMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Product ID:</span> {product._id}
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Brand ID:</span> {product.brandId}
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Added on:</span> {new Date(product.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  )
}
