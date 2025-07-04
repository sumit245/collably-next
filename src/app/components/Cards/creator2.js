"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import styles from "../../shop/StyleShop.module.css"
import { useLikeContext } from "../../actions/LikeContext"
import { addToCart, updateQuantity } from "../../store/cartSlice"
import { toggleLikeProduct, loadLikedProducts } from "../../store/likedproductSlice"

export default function Creator2({ _id, productPhoto, productPhotos, posterSrc, name, productname, followers, price }) {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)
  const likedProducts = useSelector((state) => state.likedProducts.items)
  const { cartCount, setCartCount } = useLikeContext()
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    dispatch(loadLikedProducts())
  }, [dispatch])

  const isLiked = likedProducts.some((item) => item._id === _id)

 const toggleLike = () => {
  dispatch(toggleLikeProduct({ _id, name, productname, price, image: productPhotos[0] }))
  console.log(productPhotos[0])
}

const handleAddToCart = () => {
  const existingItem = cartItems.find((item) => item._id === _id)

  if (existingItem) {
    dispatch(updateQuantity({ _id, quantity: existingItem.quantity + 1 }))
  } else {
    dispatch(
      addToCart({
        _id,
        name,
        productname,
        price,
        productPhoto: productPhotos[0], 
        quantity: 1,
      }),
    )
  }

  setCartCount(cartCount + 1)
  showNotification()
}


  const showNotification = () => {
    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, 3000)
  }

  return (
    <>
      <div className={styles.creatorCard}>
      <Link href={`/productDisplay/${_id}`}> <div className={styles.videoContainer}>
          
            <img src={productPhotos[0] || "/placeholder.svg"} alt={productname} className={styles.productImage} />
        

          <div className={styles.gradientOverlay}></div>
          <div className={styles.creatorInfo}>
            <div className={styles.creatorName}>{name}</div>
            {/* <div className={styles.followerCount}>{followers} Followers</div> */}
          </div>
        </div>  </Link>

        <div className={styles.buttonContainer1}>
          <div className={styles.productDetails}>
            <Link href={`/productDisplay/${_id}`} className={styles.productNameLink}>
              <span className={styles.price}>{productname}</span>
            </Link>
            <span className={styles.price}>₹{price}</span>
          </div>

          <div className={styles.buttonContainer2}>
            <button onClick={toggleLike} className={styles.wishlistButton}>
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

            <button className={styles.shopButton} onClick={handleAddToCart}>
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>

      {notification && <div className={styles.notification}>Item has been added to cart!</div>}
    </>
  )
}
