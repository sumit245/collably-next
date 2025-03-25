"use client"

import { useEffect, useState, Suspense } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { fetchBrands } from "../store/brandSlice"
import CreatorHome from "../components/CreatorHome";
import FooterCreator from "../components/FooterCreator";
import styles from "../brandsdisplay/page.module.css"
import styleshop from "../shop/StyleShop.module.css"
import Image from "next/image"
import Link from "next/link"

function BrandsContent() {
  const dispatch = useDispatch()
  const allBrands = useSelector((state) => state.brands.items)
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState(categoryParam || "")

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  useEffect(() => {
    if (categoryParam) {
      setCategory(categoryParam)
    }
  }, [categoryParam])

  const filteredBrands = allBrands.filter((brand) => {
    const matchesSearch = brand.brandName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory =
      !category || (brand.brandCategory && brand.brandCategory.toLowerCase() === category.toLowerCase())

    return matchesSearch && matchesCategory
  })

  return (
    <div className={styles.brandsPage}>
      <div className={styles.brandsHeader}>
        <h1 className={styles.brandsTitle}>{category ? `${category} Brands` : "All Brands"}</h1>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      {filteredBrands.length === 0 ? (
        <div className={styles.noBrandsCard}>
          <p className={styles.noBrands}>{category ? `No brands found in ${category} category` : "No brands found"}</p>
        </div>
      ) : (
        <div className={styles.brandsGrid}>
          {filteredBrands.map((brand) => {
            const imageSrc = brand.brandLogo

            return (
              <Link href={brand.brandWebsite} key={brand._id} className={styles.brandCard}>
                <div className={styles.brandLogo}>
                  <Image src={imageSrc || "/placeholder.svg"} alt={brand.brandName} width={100} height={100} />
                </div>
                <h2 className={styles.brandName}>{brand.brandName}</h2>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

// Main component with Suspense boundary
export default function CategoryBrandsDisplay() {
  return (
    <div className={styleshop.bodyShop}>
      <div className={styleshop.smartphoneContainer}>
        <CreatorHome />
        <Suspense
          fallback={
            <div className={styles.brandsPage}>
              <div className={styles.brandsHeader}>
                <h1 className={styles.brandsTitle}>Loading Brands...</h1>
              </div>
              <div className={styles.loadingContainer}>
                <p>Loading brands data...</p>
              </div>
            </div>
          }
        >
          <BrandsContent />
        </Suspense>
        <FooterCreator />
      </div>
    </div>
  )
}

