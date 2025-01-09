'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import styles from './stylesform.module.css';
import stylesShop from '../shop/StyleShop.module.css';
import { LikeProvider } from '../actions/LikeContext';
import Header from '@/app/components/HeaderShop';
import Footer from '@/app/components/FooterShop';

export default function AddressForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pincode: '',
    address: '',
    locality: '',
    city: '',
    state: '',
    addressType: 'home',
    isDefault: false
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userInfo', JSON.stringify(formData));
    router.push('/payment');
  };

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
              
          <header className={styles.header}>
            <button 
              onClick={() => router.back()} 
              className={styles.backButton}
            >
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
                  value={formData.phone}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                    className={styles.input}
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="State*"
                    className={styles.input}
                    required
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
                    formData.addressType === 'home' ? styles.active : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, addressType: 'home' }))}
                >
                  Home
                </button>
                <button
                  type="button"
                  className={`${styles.addressTypeButton} ${
                    formData.addressType === 'work' ? styles.active : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, addressType: 'work' }))}
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

