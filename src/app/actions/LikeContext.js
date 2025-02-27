
'use client';

import { createContext, useState, useContext } from 'react';

export const LikeContext = createContext();

export function LikeProvider({ children }) {
  const [likeCount, setLikeCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  return (
    <LikeContext.Provider value={{ likeCount, setLikeCount, cartCount, setCartCount }}>
      {children}
    </LikeContext.Provider>
  );
}

export function useLikeContext() {
  const context = useContext(LikeContext);
  if (context === undefined) {
    throw new Error('useLikeContext must be used within a LikeProvider');
  }
  return context;
}