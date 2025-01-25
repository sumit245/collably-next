"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import styles from "./page.module.css"
import stylesShop from "../shop/StyleShop.module.css"
import FooterCreator from "../components/FooterCreator"

export default function SetProduct() {
  const router = useRouter()
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")

  useEffect(() => {
    const storedData = localStorage.getItem("videoDetailsData")
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setSelectedBrand(parsedData.brand || "")
      setSelectedProduct(parsedData.product || "")
    }
  }, [])

  const brands = [
    { value: "brand1", label: "Brand 1" },
    { value: "brand2", label: "Brand 2" },
    { value: "brand3", label: "Brand 3" },
  ]

  const products = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
  ]

  const handleDone = () => {
    const storedData = localStorage.getItem("videoDetailsData")
    const updatedData = storedData ? JSON.parse(storedData) : {}
    updatedData.brand = selectedBrand
    updatedData.product = selectedProduct
    localStorage.setItem("videoDetailsData", JSON.stringify(updatedData))
    router.back()
  }

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
          <div className={styles.dropdownContainer}>
            <div className={styles.searchableDropdown}>
              <label htmlFor="brand">Add Brand</label>
              <select
                id="brand"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className={styles.dropdown}
              >
                <option value="">Select a brand...</option>
                {brands.map((brand) => (
                  <option key={brand.value} value={brand.value}>
                    {brand.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.searchableDropdown}>
              <label htmlFor="product">Add Product</label>
              <select
                id="product"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className={styles.dropdown}
              >
                <option value="">Select a product...</option>
                {products.map((product) => (
                  <option key={product.value} value={product.value}>
                    {product.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button className={styles.doneButton} onClick={handleDone}>
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  )
}

