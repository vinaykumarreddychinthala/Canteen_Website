"use client";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CartContext } from '../context/CartContext';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { cartItems, setCartItems, addToCart, increaseQuantity, decreaseQuantity, removeCart } = useContext(CartContext);
    
  let username,user_id;
  if (session && session.user && session.user.name) {
    username = session.user.name;
    user_id = session.user.id;
  } else {
    username = undefined;
  }
  
  
  let userCart = [];
  let totalPrice = 0;
  if(username){
    if(cartItems && Array.isArray(cartItems.items_list) && cartItems.items_list.length>0){
      userCart= cartItems.items_list;
      totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  }
  
//useeffect to store the cart items in the local storage

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


// handling order code

  const handleorder = async () => {
    if (!session) {
      alert("Please login to place order");
      return;
    }
    try {
      const result = await fetch('api/clients_post_order', {
        method: 'POST',
        headers: { 'content-Type': 'application/json' },
        body: JSON.stringify({ username, items: userCart, totalPrice, user_id})
      });
      const data = await result.json();
      console.log(data);
      if(!result.ok){
        throw new Error(data.message || "failed to place order");
      }
      alert(data.message);
      removeCart();
      router.push("/Cart/placed_order");
    } catch (error) {
      alert("Failed to place order");
      console.log(error);
    }
  };



  return (
    <div>
      {/* CART Header */}
      {userCart.length > 0?(
        <div>
          <h1 className="font-bold text-2xl ml-10 text-lime-800 border-lime-950 border-2 w-20 p-1 rounded-xl">CART</h1>
          <div className='flex ml-[400px]'>
            <div className='text-lime-400 underline text-xl ml-9'>image</div>
            <div className='text-lime-400 underline text-xl ml-24'>item</div>
            <div className='text-lime-400 underline text-xl ml-44'>price</div>
            <div className='text-lime-400 underline text-xl ml-44'>quantity</div>
          </div>
        </div>
      ):""}

      {/* Cart Items */}
      {userCart.length > 0 ? (
        <div>
          {userCart.map(item => (
            <div key={item.id} className="cart-item mt-8 rounded-2xl mb-8 ml-[400px] w-[750px] h-[150px] flex border-lime-400 border-solid border-2">
              <Image className='p-6' src={item.image} alt={item.name} width={150} height={100} />
              <p className='my-16 ml-16'>{item.name}</p>
              <div className='ml-32 mt-10'> ₹{item.price}</div>
              <button className='bg-gray-400 w-5 h-4 text-center' onClick={() => decreaseQuantity(item.id, username)}>-</button>
              <div className='ml-32 mt-10'> {item.quantity}</div>
              <button className='bg-gray-400 w-5 h-4 text-center' onClick={() => increaseQuantity(item.id, username)}>+</button>
            </div>
          ))}
          <div>
            <div className='flex justify-between items-center ml-[400px] mt-10 p-4 border-t-2 border-lime-400 w-[750px]'>
              <h2 className="text-2xl font-bold text-lime-800">Total Amount</h2>
              <div className='text-2xl font-bold text-lime-800'>₹{totalPrice}</div>
            </div>
            <button
              className='bg-lime-400 rounded-lg w-[130px] h-[35px] ml-[1050px] text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105'
              onClick={handleorder}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        // <p className='ml-10 mt-10'>Your cart is empty</p>
        <div>No items in cart, GO and Grab some items</div>
      )}

   
    </div>
  );
}
