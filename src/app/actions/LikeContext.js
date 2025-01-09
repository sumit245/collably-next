'use client';

import { createContext, useState } from 'react';

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
