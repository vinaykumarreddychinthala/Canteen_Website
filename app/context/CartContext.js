"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, username) => {
    setCartItems((prev) => {
      const userCart = prev[username] || [];
      const itemIndex = userCart.findIndex((i) => i.id === item.id);

      let updatedUserCart;
      if (itemIndex !== -1) {
        // Item exists, update quantity
        updatedUserCart = userCart.map((i, index) =>
          index === itemIndex
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      } else {
        // Item doesn't exist, add new
        updatedUserCart = [...userCart, { ...item, quantity: 1 }];
      }

      return {
        ...prev,
        [username]: updatedUserCart
      };
    });
  };

  const increaseQuantity = (itemId, username) => {
    setCartItems((prev) => {
      const userCart = prev[username] || [];
      const updatedCart = userCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );

      return {
        ...prev,
        [username]: updatedCart
      };
    });
  };

  const decreaseQuantity = (itemId, username) => {
    setCartItems((prev) => {
      const userCart = prev[username] || [];
      const updatedCart = userCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...prev,
        [username]: updatedCart
      };
    });
  };

  const removeCart = (username) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[username];
      return newCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
