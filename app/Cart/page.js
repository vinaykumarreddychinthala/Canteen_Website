"use client";
import React, { useEffect } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cartItems, increaseQuantity, decreaseQuantity, removeCart } = useContext(CartContext);

  let username, user_id;
  if (session && session.user && session.user.name) {
    username = session.user.name;
    user_id = session.user.id;
  } else {
    username = undefined;
  }

  let userCart = [];
  let totalPrice = 0;
  if (username) {
    if (cartItems && Array.isArray(cartItems.items_list) && cartItems.items_list.length > 0) {
      userCart = cartItems.items_list;
      totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleorder = async () => {
    if (!session) {
      alert("Please login to place order");
      return;
    }
    try {
      const result = await fetch('/api/clients_post_order', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ username, items: userCart, totalPrice, user_id })
      });
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.message || "failed to place order");
      }
      alert(data.message);
      removeCart();
      router.push("/placed_order");
    } catch (error) {
      alert("Failed to place order");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white px-2 py-8 flex flex-col items-center">
      {userCart.length > 0 ? (
        <div className="w-full max-w-3xl">
          <h1 className="font-bold text-xl md:text-2xl text-lime-800 border-lime-950 border-2 w-24 md:w-32 p-2 rounded-xl shadow-sm bg-white mb-6">
            CART
          </h1>
          <div className="hidden md:grid grid-cols-5 gap-4 px-2 mb-4">
            <div className="text-lime-400 underline text-lg text-center">Image</div>
            <div className="text-lime-400 underline text-lg text-center">Item</div>
            <div className="text-lime-400 underline text-lg text-center">Price</div>
            <div className="text-lime-400 underline text-lg text-center">Quantity</div>
            <div className="text-lime-400 underline text-lg text-center">Actions</div>
          </div>
          <div>
            {userCart.map(item => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between bg-slate-50 border-2 border-lime-400 rounded-xl shadow mb-6 p-4 transition"
              >
                <div className="flex-shrink-0">
                  <Image src={item.image} alt={item.name} width={100} height={80} className="rounded-lg object-cover" />
                </div>
                <div className="flex-1 text-center md:text-left mt-2 md:mt-0 md:ml-4 font-semibold">{item.name}</div>
                <div className="flex-1 text-center md:text-left mt-2 md:mt-0 text-lime-800 font-bold">₹{item.price}</div>
                <div className="flex items-center justify-center flex-1 mt-2 md:mt-0">
                  <button
                    className="bg-gray-300 w-7 h-7 rounded-l font-bold text-lg hover:bg-gray-400"
                    onClick={() => decreaseQuantity(item.id, username)}
                  >-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="bg-gray-300 w-7 h-7 rounded-r font-bold text-lg hover:bg-gray-400"
                    onClick={() => increaseQuantity(item.id, username)}
                  >+</button>
                </div>
                <div className="flex-1 flex justify-center md:justify-end mt-2 md:mt-0">
                  {/* Optionally add a remove button here */}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t-2 border-lime-400 pt-6 mt-8">
            <h2 className="text-xl md:text-2xl font-bold text-lime-800 mb-2 md:mb-0">Total Amount</h2>
            <div className="text-xl md:text-2xl font-bold text-lime-800 mb-2 md:mb-0">₹{totalPrice}</div>
            <button
              className="bg-lime-400 hover:bg-lime-500 rounded-xl w-full md:w-[180px] h-12 mt-4 md:mt-0 text-white font-semibold transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105"
              onClick={handleorder}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center text-lg text-lime-700 font-medium mt-20">
          No items in cart, go and grab some items!
        </div>
      )}
    </div>
  );
}
