"use client";

import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import Image from 'next/image';
import mango from '../images/mango.jpeg';
import apple from '../images/apple.jpeg';
import orange from '../images/orange.jpeg';
import oreo from '../images/oreo.jpeg';
import milkshake from '../images/milkshake.jpeg';
import chocoshake from '../images/chocoshake.jpeg';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function BiriyaniMenu() {
  const { data: session, status } = useSession();
  const username = session?.user?.name;
  const menuitems = [
    { id: 1, name: 'Mango Juice', price: 15, description: 'Fresh mango juice', image: mango },
    { id: 2, name: 'Apple Juice', price: 20, description: 'Chilled apple juice', image: apple },
    { id: 3, name: 'Orange Juice', price: 20, description: 'Refreshing orange juice', image: orange },
    { id: 4, name: 'Oreo Shake', price: 20, description: 'Creamy oreo shake', image: oreo },
    { id: 5, name: 'Milkshake', price: 20, description: 'Classic milkshake', image: milkshake },
    { id: 6, name: 'Chocolate Shake', price: 20, description: 'Rich chocolate shake', image: chocoshake },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-white">
      <br /><br />
      <h1 className="font-bold text-xl md:text-2xl ml-4 md:ml-10 text-lime-800 border-lime-950 border-2 w-40 md:w-52 p-1 rounded-xl">
        JUICES & SHAKES
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
            {showCartButton && (
              <button
                className="mt-4 bg-lime-400 rounded-lg w-[130px] h-[35px] text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105"
                onClick={() => addToCart(item, username)}
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}