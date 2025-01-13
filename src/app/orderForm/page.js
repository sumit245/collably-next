"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import styles from "./stylesform.module.css";
import stylesShop from "../shop/StyleShop.module.css";
import { LikeProvider } from "../actions/LikeContext";
import Header from "../components/HeaderShop";
import Footer from "../components/FooterShop";
import PincodeLookup from "india-pincode-lookup";

export default function AddressForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    addressType: "home",
    isDefault: false,
  });

  const [cityStateReadOnly, setCityStateReadOnly] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "pincode" && value.length === 6) {
      fetchCityAndState(value);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fetchCityAndState = (pincode) => {
    const locations = PincodeLookup.lookup(pincode);

    if (locations && locations.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        city: locations[0].districtName || "",
        state: locations[0].stateName || "",
      }));
      setCityStateReadOnly(true);
    } else {
      alert("No information available for this pincode.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userInfo", JSON.stringify(formData));
    router.push("/payment");
  };

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />

          <header className={styles.header}>
            <button onClick={() => router.back()} className={styles.backButton}>
              <ArrowLeft className={styles.backIcon} />
            </button>
            <h1 className={styles.title}>ADD NEW ADDRESS</h1>
          </header>

          <form className={styles.form} onSubmit={handleSubmit}>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>CONTACT DETAILS</h2>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  className={styles.input}
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.phone.startsWith("+91")
                      ? formData.phone
                      : "+91" + formData.phone
                  }
                  onChange={(e) => {
                    let value = e.target.value;
                    if (value.startsWith("+91")) {
                      value = value.slice(3);
                    }
                   
                    value = value.replace(/[^0-9]/g, "");
                    if (value.length > 10) {
                      value = value.slice(0, 10);
                    }
                    handleChange({
                      target: { name: "phone", value: "+91" + value },
                    });
                  }}
                  placeholder="Mobile No*"
                  className={styles.input}
                  required
                />
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>ADDRESS</h2>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length <= 6) {
                      handleChange({
                        target: { name: "pincode", value: value },
                      });
                    }
                  }}
                  placeholder="Pin Code*"
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Address (House No, Building, Street, Area)*"
                  className={styles.input}
                  required
                />
                <input
                  type="text"
                  name="locality"
                  value={formData.locality}
                  onChange={handleChange}
                  placeholder="Locality / Town*"
                  className={styles.input}
                  required
                />
                <div className={styles.cityStateGroup}>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City / District*"
                    className={styles.inputCity}
                    required
                    readOnly={cityStateReadOnly}
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State*"
                    className={styles.inputCity}
                    required
                    readOnly={cityStateReadOnly}
                  />
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>SAVE ADDRESS AS</h2>
              <div className={styles.addressTypeGroup}>
                <button
                  type="button"
                  className={`${styles.addressTypeButton} ${
                    formData.addressType === "home" ? styles.active : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, addressType: "home" }))
                  }
                >
                  Home
                </button>
                <button
                  type="button"
                  className={`${styles.addressTypeButton} ${
                    formData.addressType === "work" ? styles.active : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, addressType: "work" }))
                  }
                >
                  Work
                </button>
              </div>
            </section>

            <label className={styles.defaultCheckbox}>
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
              />
              Make this my default address
            </label>

            <button type="submit" className={styles.submitButton}>
              ADD ADDRESS
            </button>
          </form>

          <Footer />
        </div>
      </div>
    </LikeProvider>
  );
}