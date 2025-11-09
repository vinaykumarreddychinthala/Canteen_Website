"use client";
import React from "react";
import { CartContext } from '../context/CartContext';
import { useContext } from "react";
import Image from "next/image";
import butterscotch from '../images/butterscotch.jpeg';
import caramel from '../images/caramel.jpg';
import chocolate from '../images/chocolate.jpg';
import icecream from '../images/icecream.jpeg';
import strawberry from '../images/strawberry.webp';
import vanilla from '../images/vanilla.jpg';
import { useSession } from "next-auth/react";

export default function IcecreamMenu() {
  const { data: session, status } = useSession();
  const username = session?.user?.name;
  const menuitems = [
    { id: 1, name: 'Butterscotch', price: 30, description: 'Creamy butterscotch ice cream', image: butterscotch },
    { id: 2, name: 'Caramel', price: 35, description: 'Rich caramel ice cream', image: caramel },
    { id: 3, name: 'Chocolate', price: 35, description: 'Classic chocolate ice cream', image: chocolate },
    { id: 4, name: 'Ice Cream', price: 25, description: 'Delicious vanilla ice cream', image: icecream },
    { id: 5, name: 'Strawberry', price: 30, description: 'Fresh strawberry ice cream', image: strawberry },
    { id: 6, name: 'Vanilla', price: 25, description: 'Classic vanilla ice cream', image: vanilla },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-white">
      <br /><br />
      <h1 className="font-bold text-xl md:text-2xl ml-4 md:ml-10 text-lime-800 border-lime-950 border-2 w-44 md:w-56 p-1 rounded-xl">
        ICE CREAMS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 md:px-20">
        {menuitems.map((item) => (
          <div
            key={item.id}
            className="border-2 border-lime-400 rounded-xl bg-white shadow-md hover:shadow-lg transition flex flex-col items-center mb-8 p-4"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="rounded-lg object-cover"
            />
            <h2 className="font-serif font-bold text-lg mt-3 text-lime-700">{item.name}</h2>
            <p className="font-light text-sm text-gray-700">{item.description}</p>
            <p className="mt-1 text-base font-semibold text-lime-800">Price: ₹{item.price}</p>
            <button
              className="mt-4 bg-lime-400 rounded-lg w-[130px] h-[35px] text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105"
              onClick={() => addToCart(item)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
