"use client";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { CartContext } from '../context/CartContext';

export default function Cart() {
  const { data: session, status } = useSession();
  const [orderplaced,setorderplaced] = useState(false);
  const [finalprice,setfinalprice] = useState(0);
  const [orderStatus, setOrderStatus] = useState(null);
  const { cartItems, setCartItems, addToCart, increaseQuantity, decreaseQuantity, removeCart } = useContext(CartContext);
  const [order_collected,setoreder_collected] = useState(false);
  
  const [myorder, setmyorder] = useState(() => {
    const saved = localStorage.getItem("myorder");
    return saved ? JSON.parse(saved) : [];
  });
  
  
  
  
  let username;
  if (session && session.user && session.user.name) {
    username = session.user.name;
  } else {
    username = undefined;
  }
  
  
  // useeffect to update the orderplaced or not  
  
  useEffect(() => {
    localStorage.setItem("myorder", JSON.stringify(myorder));
  }, [myorder]);
  useEffect(()=>{
    if(myorder.length >0){
      setorderplaced(true);
    }
  },[myorder]);
  
  
  
  
  let userCart;
  if(username){
    userCart= cartItems[username] || [];
  }
  else {
    userCart = [];
  }
  const totalPrice = userCart.reduce((total, item) => total + item.price * item.quantity, 0);
  
//useeffect to store the cart items in the local storage

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


// useeffect for to calculate the total price after the order being placed

  useEffect(()=>{
    if(myorder.length>0){
      const total = myorder.reduce((total,item)=>total + item.price * item.quantity, 0);
      setfinalprice(total);
    }
  },[myorder]);



// useeffect for to fetch the order status

   useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/client_get_orderstatus`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        setOrderStatus(data);
      }
    };
    
    fetchOrder();
    const interval = setInterval(fetchOrder, 3000); // Poll every 10s
    return () => clearInterval(interval);
  }, [username]);
  
  console.log(orderStatus);


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
        body: JSON.stringify({ username, items: userCart, totalPrice })
      });
      const data = await result.json();
      console.log(data);
      if(!result.ok){
        throw new Error(data.message || "failed to place order");
      }
      alert(data.message);
      setorderplaced(true);
      setmyorder(data.order);
      // removeCart(username);
      
    } catch (error) {
      alert("Failed to place order");
      console.log(error);
      setorderplaced(false);
    }
  };

  //handle collect button

async function handlecollect() {
  try {
    const result_collect = await fetch('api/orderstatus_remove', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    const data = await result_collect.json();

    if (!result_collect.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    alert(data.message);
    console.log(data.message);

    const result_orderremoval = await fetch('api/remove_order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data_2 = await result_orderremoval.json();
    if(!result_orderremoval.ok){
      throw new Error(data_2.message || "Something went wrong");
    }
    alert(data_2.message);
    console.log(data_2.message);
  } catch (err) {
    alert("Error: " + err.message);
    console.error(err);
  }

  setoreder_collected(true);
  
}


  return (
    <div>
      {/* CART Header */}
      {userCart.length > 0 && !orderplaced?(
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
      {userCart.length > 0 && !orderplaced? (
        userCart.map(item => (
          <div key={item.id} className="cart-item mt-8 rounded-2xl mb-8 ml-[400px] w-[750px] h-[150px] flex border-lime-400 border-solid border-2">
            <Image className='p-6' src={item.image} alt={item.name} width={150} height={100} />
            <p className='my-16 ml-16'>{item.name}</p>
            <div className='ml-32 mt-10'> ₹{item.price}</div>
            <button className='bg-gray-400 w-5 h-4 text-center' onClick={() => decreaseQuantity(item.id, username)}>-</button>
            <div className='ml-32 mt-10'> {item.quantity}</div>
            <button className='bg-gray-400 w-5 h-4 text-center' onClick={() => increaseQuantity(item.id, username)}>+</button>
          </div>
        ))
      ) : (
        // <p className='ml-10 mt-10'>Your cart is empty</p>
        ""
      )}

      {/* Total and Place Order Button */}
      {userCart.length>0 && !orderplaced && (
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
      )}


      {orderplaced && myorder.length > 0 ? (
      <div className="ml-[400px] mt-10 p-4 border-t-2 border-lime-400 w-[750px]">
        <h2 className="text-2xl font-bold text-lime-800 mb-4">Your Order</h2>

        {myorder.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}

        <hr className="border-lime-400 my-4" />

        <div className="flex justify-between font-bold text-xl">
          <span>Total Amount:</span>
          <span>₹{finalprice}</span>
        </div>

          {/* ✅ Order status line placed separately for clarity */}
          <p className="text-lime-700 mt-2 font-medium">Order status: Pending</p>
      </div>
        ) : null}



          {orderplaced && orderStatus && !order_collected?(
            <div>
              {orderStatus.iscompleted?(
                  <div className="mt-4 text-lime-700">
                    <p>Order Status: completed </p>
                    <p className="text-green-700 mt-4">Your order is completed. Thank you!</p>
                    <button
                      className='bg-lime-400 rounded-lg w-[130px] h-[35px] ml-[70px] text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105'
                      onClick={handlecollect}
                    >
                      collect
                    </button>
                  </div>
              ):(
                  <div>
                    <p>Estimated Preparation Time: {orderStatus.estimatedtime} minutes</p>
                  </div>
              )}
            </div>
          ):(
            <div>
              <p>order status pending</p>
              
            </div>
          )}

          {order_collected?(
            <div>place a new order , Go and grab some items</div>
          ):null}


            
    </div>
  );
}
