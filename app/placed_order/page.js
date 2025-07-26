"use client";
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useSession } from 'next-auth/react';
import { CartContext } from '../context/CartContext';

export default function Placed_order() {
  const { data: session, status } = useSession();
  const [orderplaced, setorderplaced] = useState(true);
  const [finalprices, setfinalprices] = useState({});
  const [orderStatuses, setOrderStatuses] = useState(null);
  const { cartItems, setCartItems, addToCart, increaseQuantity, decreaseQuantity, removeCart } = useContext(CartContext);
  const [order_collected, setorder_collected] = useState({});
  const [myorder_statuses, setmyorder_statuses] = useState({});
  const [myorder, setmyorder] = useState(() => {
    const saved = localStorage.getItem("myorder");
    return saved ? JSON.parse(saved) : [];
  });

  let username;
  let user_id;
  if (session && session.user && session.user.name) {
    username = session.user.name;
    user_id = session.user.id;
  } else {
    username = undefined;
  }

  useEffect(() => {
    async function FetchOrders() {
      try {
        const res = await fetch(`/api/client_get_order?user_id=${user_id}`);
        const data = await res.json();
        setmyorder(data);
      } catch (e) {
        console.error("failed to fetch orders:", e);
      }
    }
    if (user_id) {
      FetchOrders();
    }
  }, [user_id]);

  useEffect(() => {
    localStorage.setItem("myorder", JSON.stringify(myorder));
  }, [myorder]);
  useEffect(() => {
    if (myorder.length > 0) {
      setorderplaced(true);
    }
  }, [myorder]);

  useEffect(() => {
    if (Array.isArray(myorder) && myorder.length > 0) {
      const newfinalprices = {};
      for (let i = 0; i < myorder.length; i++) {
        const order = myorder[i];
        const save_id = order._id;
        if (Array.isArray(order.items) && order.items.length > 0) {
          const total = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
          newfinalprices[save_id] = total;
        }
      }
      setfinalprices(newfinalprices);
    }
  }, [myorder]);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await fetch(`/api/client_get_orderstatus?user_id=${user_id}`);
      if (res.ok) {
        const data = await res.json();
        setOrderStatuses(data);
      }
    };

    fetchOrder();
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [username, user_id]);

  useEffect(() => {
    if (Array.isArray(orderStatuses) && orderStatuses.length > 0) {
      const dup_orderStatuses = {};
      for (let i = 0; i < orderStatuses.length; i++) {
        const orderstatus = orderStatuses[i];
        const save_id = orderstatus._id;
        dup_orderStatuses[save_id] = orderStatuses[i];
      }
      setmyorder_statuses(dup_orderStatuses);
    }
  }, [orderStatuses, myorder]);

  async function handlecollect(doc_id) {
    try {
      const result_collect = await fetch('/api/orderstatus_remove', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: doc_id })
      });

      const data = await result_collect.json();

      if (!result_collect.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert(data.message);

      const result_orderremoval = await fetch('/api/remove_order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: doc_id })
      });
      const data_2 = await result_orderremoval.json();
      if (!result_orderremoval.ok) {
        throw new Error(data_2.message || "Something went wrong");
      }
      alert(data_2.message);
    } catch (err) {
      alert("Error: " + err.message);
      console.error(err);
    }

    setorder_collected(true);
  }

  return (
    <div className="min-h-screen bg-white px-2 py-8 flex flex-col items-center">
      {myorder.length > 0 ? (
        <div className="w-full max-w-2xl bg-white border-2 border-lime-400 rounded-xl shadow-lg p-4 md:p-8">
          <h2 className="text-2xl font-bold text-lime-800 mb-6 text-center">Your Order</h2>
          {Array.isArray(myorder) && myorder.map(order => (
            <div key={order._id} className="mb-8">
              {Array.isArray(order.items) && order.items.map(item => (
                <div key={item.id} className="flex justify-between mb-2 text-base md:text-lg">
                  <span>{item.name} x {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-lg md:text-xl mt-2">
                <span>Total Amount:</span>
                <span>
                  ₹{finalprices && finalprices[order._id] !== undefined
                    ? finalprices[order._id]
                    : "Calculating..."}
                </span>
              </div>
              <div className="mt-4">
                {myorder_statuses[order._id] ? (
                  <div>
                    {myorder_statuses[order._id].iscompleted ? (
                      <div className="text-lime-700">
                        <p>Order Status: <span className="font-semibold">Completed</span></p>
                        <p className="text-green-700 mt-2">Your order is completed. Thank you!</p>
                        <button
                          className='bg-lime-400 rounded-lg w-[130px] h-[35px] mt-4 text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105'
                          onClick={() => handlecollect(order._id)}
                        >
                          Collect
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lime-700 font-medium">Estimated Preparation Time: <span className="font-semibold">{myorder_statuses[order._id].timedelay}</span> minutes</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <p className="text-lime-700 mt-2 font-medium">Order status: <span className="font-semibold">Pending</span></p>
                  </div>
                )}
              </div>
              <hr className="border-lime-400 my-6" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg text-lime-700 font-medium mt-20">
          Place a new order, go and grab some items!
        </div>
      )}
    </div>
  );
}
