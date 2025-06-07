"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import CreatorCardShopify from "./Cards/Creator2Shopify"
import styles from "../shop/StyleShop.module.css"
import { fetchShopifyProducts } from "../store/shopifySlice"

export default function ReelsSec2Shopify({ sectionTitle }) {
  const dispatch = useDispatch()
  const allShopifyProducts = useSelector((state) => state.shopifyProducts.items)
  const [displayProducts, setDisplayProducts] = useState([])

  useEffect(() => {
    dispatch(fetchShopifyProducts())
  }, [dispatch])

  useEffect(() => {
    console.log("All Shopify Products:", allShopifyProducts)

    // No filtering — just display the first 4 or all
    const limitedProducts = allShopifyProducts
    console.log("Products to display:", limitedProducts)

    setDisplayProducts(limitedProducts)
  }, [allShopifyProducts])

  return (
    <section className={styles.creatorSection}>
      <div className={styles.sectionHeader}>
        <h4 className={styles.sectionTitleShop}>{sectionTitle}</h4>
        <Link href={`/shopifyProducts`} className={styles.viewAllLink}>
          View All <ArrowRight className={styles.arrowIcon} />
        </Link>
      </div>
      <div className={styles.creatorScroll}>
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => <CreatorCardShopify key={product.id} {...product} />)
        ) : (
          <p>Coming Soon..Stay tuned..</p>
        )}
      </div>
    </section>
  )
}
