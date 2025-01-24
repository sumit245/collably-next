"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CreatorCard from "./Cards/creator2"
import styles from "../shop/StyleShop.module.css"
import { fetchProducts } from "../store/productSlice"

export default function ReelsSec2({ sectionTitle }) {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.products.items)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  console.log("Products in ReelsSec2:", products)

  return (
    <section className={styles.creatorSection}>
      <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
      <div className={styles.creatorScroll}>
        {products.length > 0 ? (
          products.map((product) => <CreatorCard key={product._id} {...product} />)
        ) : (
          <p>No products available</p>
        )}
      </div>
    </section>
  );
}

