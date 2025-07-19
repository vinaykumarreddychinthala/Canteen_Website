"use client";
import { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export const CartContext = createContext();

export function CartProvider({ children }) {
  const { data: session, status } = useSession();
  const default_cartItems = {user_id: "", username: "", items_list:[]};

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      if (saved && saved !== "undefined") {
        return JSON.parse(saved);
      }
      return default_cartItems;
    } catch (error) {
      // If JSON.parse fails for any reason, return the default object
      return default_cartItems;
    }
  });


  useEffect(()=>{
    if(status == "authenticated" && session?.user?.id){
      setCartItems((prev)=>({
        ...prev,
          user_id:session.user.id,
          username: session.user.name,
      }));
    }
  },[status,session]); 

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const userCart = prev.items_list;
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
        items_list: updatedUserCart
      };
    });


  };

  const increaseQuantity = (itemId, username) => {
    setCartItems((prev) => {
      const userCart = prev["items_list"];
      const updatedCart = userCart.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      );

      return {
        ...prev,
        items_list: updatedCart
      };
    });
  };

  const decreaseQuantity = (itemId, username) => {
    setCartItems((prev) => {
      const userCart = prev["items_list"];
      const updatedCart = userCart
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);

      return {
        ...prev,
        items_list: updatedCart
      };
    });
  };

  const removeCart = () => {
    setCartItems(default_cartItems);
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
