"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "lucide-react";
import { fetchProducts } from "../../store/productSlice";
import CreatorCard from "../../components/Cards/creator2";
import FooterCreator from '../../components/FooterCreator'
import CreatorHome from '../../components/CreatorHome'
import styles from "./page.module.css";
import styleshop from "../../shop/StyleShop.module.css";
import { LikeProvider } from "../../actions/LikeContext";  

export default function CategoryProducts() {
  const params = useParams();
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.items);
  const [searchTerm, setSearchTerm] = useState("");
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const categoryProducts = allProducts.filter((product) => product.category === category);

  const filteredProducts = categoryProducts.filter((product) =>
    product.productname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <LikeProvider> {/* Wrap with LikeProvider */}
 
      <div className={styleshop.bodyShop}>
        <div className={styleshop.smartphoneContainer}>
        <CreatorHome />
          <div className={styles.categoryPage}>
            <div className={styles.categoryHeader}>
              <h1 className={styles.categoryTitle}>{category} Products</h1>
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            {filteredProducts.length === 0 ? (
             <div className={styles.noProductsCard}>
             <p className={styles.noProducts}>Comming soon</p>
           </div>
            ) : (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <CreatorCard key={product._id} {...product} />
                ))}
              </div>
            )}
          </div>
          <div style={{ position: 'relative', top: '5rem' }}> 
          <FooterCreator />
          </div>
        </div>
      
      </div>
      
    </LikeProvider>
  );
}
