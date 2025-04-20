"use client";

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { fetchProductById } from "../../store/productSlice"
import { addToCart, updateQuantity } from "../../store/cartSlice"
import { toggleLikeProduct } from "../../store/likedproductSlice"
import styles from "./ProductDetail.module.css"
import Header from "../../components/HeaderShop"
import Footer from "../../components/FooterShop"
import styleshop from "../../shop/StyleShop.module.css"
import { LikeProvider, LikeContext } from "../../actions/LikeContext"
import { useContext } from "react"

// Main component that doesn't use the context
export default function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()

  const product = useSelector((state) => state.products.currentProduct)
  const isLoading = useSelector((state) => state.products.isLoading)
  const error = useSelector((state) => state.products.error)

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id])

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
    <LikeProvider>
      <ProductDetailContent product={product} />
    </LikeProvider>
  )
}

// Inner component that uses the context (only used inside the provider)
function ProductDetailContent({ product }) {
  const dispatch = useDispatch()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [notification, setNotification] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const carouselRef = useRef(null)

  // Now this hook is safely used within the LikeProvider
  const { likeCount, setLikeCount, cartCount, setCartCount } = useContext(LikeContext)

  const cartItems = useSelector((state) => state.cart.items)
  const likedProducts = useSelector((state) => state.likedProducts.items)

  const isLiked = likedProducts.some((item) => item._id === product._id)

  // Prepare images array for carousel
  const getImages = () => {
    const images = []
    if (product.productPhoto) {
      images.push(product.productPhoto)
    }

    if (product.productPhotos && Array.isArray(product.productPhotos)) {
      images.push(...product.productPhotos)
    }

    return images.length > 0 ? images : ["/placeholder.svg"]
  }

  const images = getImages()

  const handleAddToCart = () => {
    const existingItem = cartItems.find((item) => item._id === product._id)

    if (existingItem) {
      dispatch(
        updateQuantity({
          _id: product._id,
          quantity: existingItem.quantity + 1,
        }),
      )
    } else {
      dispatch(
        addToCart({
          _id: product._id,
          name: product.brandId,
          productname: product.productname,
          productPhoto: product.productPhoto,
          price: product.price,
          quantity: 1,
        })
      );
    }

    // Update cart count
    setCartCount(cartCount + 1)

    // Show notification
    showNotification()
  }

  const showNotification = () => {
    setNotification(true)
    setTimeout(() => {
      setNotification(false)
    }, 3000)
  }

  const toggleLike = () => {
    dispatch(
      toggleLikeProduct({
        _id: product._id,
        name: product.brandId,
        productname: product.productname,
        price: product.price,
        image: product.productPhoto,
      })
    );
  };

  // Handle image carousel navigation
  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe && currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    }

    if (isRightSwipe && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    }

    // Reset values
    setTouchStart(0)
    setTouchEnd(0)
  }

  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <Header />
        <div className={styles.productDetailContainer}>
          {/* Image Carousel */}
          <div
            className={styles.productImageCarousel}
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className={styles.carouselTrack}
              style={{
                transform: `translateX(-${currentImageIndex * 100}%)`,
              }}
            >
              {images.map((image, index) => (
                <div key={index} className={styles.carouselSlide}>
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.productname} - Image ${index + 1}`}
                    className={styles.productImage}
                  />
                </div>
              ))}
            </div>

            {/* Navigation dots */}
            {images.length > 1 && (
              <div className={styles.carouselDots}>
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.carouselDot} ${currentImageIndex === index ? styles.activeDot : ""}`}
                    onClick={() => goToImage(index)}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.productName}>{product.productname}</h1>
            <div className={styles.productCategory}>Category: {product.category}</div>
            <div className={styles.productPrice}>₹{product.price}</div>

            <div className={styles.productDescription}>
              <h3 className={styles.productDetails}>Description</h3>
              <p className={styles.productDetails}>{product.description}</p>
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
          </div>
          <Footer />
        </div>
        <Footer />
      </div>

      {/* Notification */}
      {notification && <div className={styleshop.notification}>Item has been added to cart!</div>}
    </div>
  )
}
