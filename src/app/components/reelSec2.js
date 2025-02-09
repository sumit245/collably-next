"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CreatorCard from "./Cards/creator2"
import styles from "../shop/StyleShop.module.css"
import { fetchProducts } from "../store/productSlice"

export default function ReelsSec2({ sectionTitle, category }) {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.products.items)
  const [displayProducts, setDisplayProducts] = useState([])

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  useEffect(() => {
    // Filter products by category and limit to 4 for display
    const filteredProducts = allProducts.filter((product) => product.category === category).slice(0, 4)
    setDisplayProducts(filteredProducts)
  }, [allProducts, category])

  return (
    <section className={styles.creatorSection}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
        <Link href={`/products/${category ? category.toLowerCase() : ''}`} className={styles.viewAllLink}>
  View All <ArrowRight className={styles.arrowIcon} />
</Link>

      </div>
      <div className={styles.creatorScroll}>
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => <CreatorCard key={product._id} {...product} />)
        ) : (
          <p>No products available in this category</p>
        )}
      </div>
    </section>
  )
}

