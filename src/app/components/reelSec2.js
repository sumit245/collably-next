
"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreatorCard from "./Cards/creator2"
import styles from "../shop/StyleShop.module.css"
import { fetchProducts } from "../store/productSlice"

export default function ReelsSec2({ sectionTitle }) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)
  const isLoading = useSelector((state) => state.products.isLoading)

  useEffect(() => {
    dispatch(fetchProducts())
    
  }, [dispatch])
  console.log(products)
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <section className={styles.creatorSection}>
      <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
      <div className={styles.creatorScroll}>
        {products.map((product) => (
          <CreatorCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}
