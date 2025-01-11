'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './stylesOrder.module.css';
import stylesShop from '../shop/StyleShop.module.css';
import Header from '../components/HeaderShop';
import Footer from '../components/FooterShop';
import { LikeProvider } from '../actions/LikeContext';

export default function OrderConfirmation() {
  const [userInfo, setUserInfo] = useState(null);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    const storedTotal = parseFloat(localStorage.getItem('total')) || 0;
    setUserInfo(storedUserInfo);
    setTotal(storedTotal);
    setPaymentMethod(storedUserInfo?.payment || 'cash');
  }, []);

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'card':
        return 'Credit/Debit Card';
      case 'upi':
        return 'UPI Payment';
      case 'wallet':
        return 'Wallet';
      case 'netbanking':
        return 'Net Banking';
      default:
        return 'Cash on Delivery';
    }
  };

  return (
    <LikeProvider>
      <div className={stylesShop.bodyShop}>
        <div className={stylesShop.smartphoneContainer}>
          <Header />
          <h2 className={styles.title}>Order Confirmation</h2>
          <div className={styles.cartContainer}>
            <div className={styles.itemList}>
              <p>Thank you for your order! Your order has been placed and is being processed.</p>
              {userInfo && (
                <>
                  <p>Delivery to: {userInfo.name}</p>
                  <p>{userInfo.address}</p>
                  <p>{userInfo.locality}, {userInfo.city}, {userInfo.state} - {userInfo.pincode}</p>
                  
                  <p>Phone: {userInfo.phone}</p>
                </>
              )}
              <p>Payment Method: {getPaymentMethodText(paymentMethod)}</p>
              <p>Total: ₹{total.toFixed(2)}</p>
              <p>Order Number: {Math.floor(Math.random() * 1000000)}</p>
              <p>Estimated delivery: 3-5 business days</p>
            </div>
            <div className={styles.summary}>
              <Link href="/shop">
                <button className={styles.placeOrderButton}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </LikeProvider>
  );
}

