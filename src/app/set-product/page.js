"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { ChevronDown, ChevronUp, Search, ArrowLeft } from 'lucide-react'
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"
import { fetchBrands, fetchProductsByBrand, createReferralLink } from "../store/brandSlice"
import ProductDetails from "./ProductDetails"
import Link from 'next/link'

export default function SetProduct() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [selectedProductDetails, setSelectedProductDetails] = useState(null)
  const [isBrandDropdownOpen, setIsBrandDropdownOpen] = useState(false)
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [brandSearchQuery, setBrandSearchQuery] = useState("")
  const [productSearchQuery, setProductSearchQuery] = useState("")

  const brands = useSelector((state) => state.brands.items)
  const products = useSelector((state) => state.brands.products)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  useEffect(() => {
    if (selectedBrand) {
      dispatch(fetchProductsByBrand(selectedBrand))
    }
  }, [dispatch, selectedBrand])

  useEffect(() => {
    if (!user) {
      router.push(`/login?redirect=${encodeURIComponent("/set-product")}`)
    }
  }, [user, router])

  const handleBrandSelect = (brandId) => {
    setSelectedBrand(brandId)
    setSelectedProduct("")
    setSelectedProductDetails(null)
    setIsBrandDropdownOpen(false)
    setIsProductDropdownOpen(false)
  }

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId)
    const selectedProductData = products.find((product) => product._id === productId)
    setSelectedProductDetails(selectedProductData)
    setIsProductDropdownOpen(false)
  }

  const handleDone = async () => {
    if (!user) {
      console.error("User is not logged in")
      router.push(`/login?redirect=${encodeURIComponent("/set-product")}`)
      return
    }

    const userId = user._id || user.id || user.user?._id || user.user?.id

    if (!userId) {
      console.error("Unable to find user ID in the user object:", user)
      return
    }

    if (selectedBrand && selectedProduct && userId) {
      try {
        const result = await dispatch(
          createReferralLink({
            userId: userId,
            productId: selectedProduct,
            brandId: selectedBrand,
          }),
        ).unwrap()

        const storedData = localStorage.getItem("videoDetailsData")
        const updatedData = storedData ? JSON.parse(storedData) : {}
        updatedData.brand = brands.find((brand) => brand._id === selectedBrand)?.brandName
        updatedData.product = products.find((product) => product._id === selectedProduct)?.productname
        updatedData.referralLink = result.referralLink
        localStorage.setItem("videoDetailsData", JSON.stringify(updatedData))
        router.back()
      } catch (error) {
        console.error("Failed to create referral link:", error)
      }
    } else {
      console.error("Please select a brand and a product")
    }
  }

  if (!user) {
    return null
  }

  const selectedBrandData = brands.find((brand) => brand._id === selectedBrand)
  const filteredBrands = brands.filter((brand) =>
    brand.brandName.toLowerCase().includes(brandSearchQuery.toLowerCase()),
  )
  const filteredProducts = products.filter(
    (product) =>
      product.productname.toLowerCase().includes(productSearchQuery.toLowerCase()) && product.brandId === selectedBrand,
  )

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
        <Link href="/video-details">
        <button className={styles.backButton}>
          <ArrowLeft size={24} color="white" />
        </button>
        </Link>
          <h1 className={styles.title}>Select Product</h1>
          <div className={styles.dropdownContainer}>
            {/* Brand Dropdown */}
            <div className={styles.customDropdown}>
              <label htmlFor="brand">Select Brand</label>
              <div className={styles.dropdownHeader} onClick={() => setIsBrandDropdownOpen(!isBrandDropdownOpen)}>
                {selectedBrandData ? (
                  <div className={styles.selectedItem}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{selectedBrandData.brandName}</span>
                      <span className={styles.itemDescription}>{selectedBrandData.brandDescription}</span>
                    </div>
                    {selectedBrandData.brandLogo && (
                      <Image
                        src={selectedBrandData.brandLogo || "/placeholder.svg"}
                        alt="Brand Logo"
                        width={40}
                        height={40}
                        className={styles.itemLogo}
                      />
                    )}
                  </div>
                ) : (
                  <span className={styles.placeholder}>Select a brand...</span>
                )}
                {isBrandDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              {isBrandDropdownOpen && (
                <div className={styles.dropdownList}>
                  <div className={styles.searchInputWrapper}>
                    <Search className={styles.searchIcon} size={16} />
                    <input
                      type="text"
                      placeholder="Search brands..."
                      value={brandSearchQuery}
                      onChange={(e) => setBrandSearchQuery(e.target.value)}
                      className={styles.searchInput}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {filteredBrands.map((brand) => (
                    <div
                      key={brand._id}
                      className={`${styles.dropdownItem} ${selectedBrand === brand._id ? styles.selected : ""}`}
                      onClick={() => handleBrandSelect(brand._id)}
                    >
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{brand.brandName}</span>
                        <span className={styles.itemDescription}>{brand.brandDescription}</span>
                      </div>

                      <Image
                        src={brand.brandLogo || "/placeholder.svg"}
                        alt="Brand Logo"
                        width={40}
                        height={40}
                        className={styles.itemLogo}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Dropdown */}
            {selectedBrand && (
              <div className={styles.customDropdown}>
                <label htmlFor="product">Select Product</label>
                <div className={styles.dropdownHeader} onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}>
                  {selectedProductDetails ? (
                    <div className={styles.selectedItem}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{selectedProductDetails.productname}</span>
                        <span className={styles.itemDescription}>{selectedProductDetails.description}</span>
                      </div>
                    </div>
                  ) : (
                    <span className={styles.placeholder}>Select a product...</span>
                  )}
                  {isProductDropdownOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {isProductDropdownOpen && (
                  <div className={styles.dropdownList}>
                    <div className={styles.searchInputWrapper}>
                      <Search className={styles.searchIcon} size={16} />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={productSearchQuery}
                        onChange={(e) => setProductSearchQuery(e.target.value)}
                        className={styles.searchInput}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product._id}
                          className={`${styles.dropdownItem} ${selectedProduct === product._id ? styles.selected : ""}`}
                          onClick={() => handleProductSelect(product._id)}
                        >
                          <div className={styles.itemInfo}>
                            <span className={styles.itemName}>{product.productname}</span>
                            <span className={styles.itemDescription}>{product.description}</span>
                          </div>
                          <Image
                            src={product.productLogo || "/placeholder.svg"}
                            alt="Product Logo"
                            width={40}
                            height={40}
                            className={styles.itemLogo}
                          />
                        </div>
                      ))
                    ) : (
                      <div className={styles.noProducts}>
                        <p>No products found</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {selectedProductDetails && <ProductDetails product={selectedProductDetails} />}
          </div>

          <button className={styles.doneButton} onClick={handleDone} disabled={!selectedProduct}>
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}