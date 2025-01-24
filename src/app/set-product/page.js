"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import stylesShop from "../shop/StyleShop.module.css";
import FooterCreator from "../components/FooterCreator";
import Select from "react-select";

export default function SetVisibility() {
  const router = useRouter();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const brands = [
    { value: "brand1", label: "Brand 1" },
    { value: "brand2", label: "Brand 2" },
    { value: "brand3", label: "Brand 3" },
  ];

  const products = [
    { value: "product1", label: "Product 1" },
    { value: "product2", label: "Product 2" },
    { value: "product3", label: "Product 3" },
  ];

  const handleDone = () => {
    // Handle submission
    console.log("Selected Brand:", selectedBrand);
    console.log("Selected Product:", selectedProduct);
    router.back(); // Navigate back
  };

  return (
    <div className={stylesShop.bodyShop}>
      <div className={stylesShop.smartphoneContainer}>
        <div className={styles.container}>
        

          <div className={styles.dropdownContainer}>
            <div className={styles.searchableDropdown}>
              <label htmlFor="brand">Add Brand</label>
              <Select
                id="brand"
                options={brands}
                value={selectedBrand}
                onChange={setSelectedBrand}
                placeholder="Search brand..."
              />
            </div>

            <div className={styles.searchableDropdown}>
              <label htmlFor="product">Add Product</label>
              <Select
                id="product"
                options={products}
                value={selectedProduct}
                onChange={setSelectedProduct}
                placeholder="Search product..."
              />
            </div>
          </div>

          <button className={styles.doneButton} onClick={handleDone}>
            Done
          </button>
        </div>
        <FooterCreator />
      </div>
    </div>
  );
}
