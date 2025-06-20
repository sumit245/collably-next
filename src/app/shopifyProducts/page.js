"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Search } from "lucide-react"
import { fetchShopifyProducts } from "../store/shopifySlice"
import CreatorCardShopify from "../components/Cards/Creator2Shopify"
import Header from "../components/HeaderShop"
import Footer from "../components/FooterShop"
import styles from "./page.module.css"
import styleshop from "../shop/StyleShop.module.css"
import { LikeProvider } from "../actions/LikeContext"

export default function ShopifyProducts() {
  const dispatch = useDispatch()
  const allShopifyProducts = useSelector((state) => state.shopifyProducts.items)
  const isLoading = useSelector((state) => state.shopifyProducts.isLoading)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    dispatch(fetchShopifyProducts())
  }, [dispatch])

  const filteredProducts = allShopifyProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <LikeProvider>
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
          <Header />
          <div className={styles.productsPage}>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>All Shopify Products</h1>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search Shopify products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {isLoading ? (
              <div className={styles.loading}>Loading products...</div>
            ) : filteredProducts.length === 0 ? (
              <div className={styles.noProductsCard}>
                <p className={styles.noProducts}>
                  {searchTerm ? "No products found matching your search." : "No Shopify products available."}
                </p>
              </div>
            ) : (
              <>
                <div className={styles.resultsCount}>
                  {searchTerm && <p>Found {filteredProducts.length} products</p>}
                </div>
                <div className={styles.productsGrid}>
                  {filteredProducts.map((product) => (
                    <CreatorCardShopify key={product.id} {...product} />
                  ))}
                </div>
              </>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  )
}
