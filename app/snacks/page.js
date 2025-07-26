"use client";

import { CartContext } from '../context/CartContext';
import { useContext } from 'react';
import Image from 'next/image';
import noodles from '../images/noodles.jpg';
import sandwich from '../images/sandwich.jpeg';
import french from '../images/french.jpeg';
import rice from '../images/rice.jpeg';
import samosa from '../images/samosa.jpg';
import dosa from '../images/dosa.jpeg';
import { useSession } from 'next-auth/react';

export default function BiriyaniMenu() {
  const { data: session, status } = useSession();
  const username = session?.user?.name;
  const menuitems = [
    { id: 1, name: 'Noodles', price: 65, description: 'Tasty noodles with veggies', image: noodles },
    { id: 2, name: 'Sandwich', price: 50, description: 'Fresh sandwich with filling', image: sandwich },
    { id: 3, name: 'French fries', price: 70, description: 'Crispy golden fries', image: french },
    { id: 4, name: 'Chicken fried rice', price: 80, description: 'Fried rice with chicken', image: rice },
    { id: 5, name: 'Samosa', price: 20, description: 'Crispy samosa with filling', image: samosa },
    { id: 6, name: 'Dosa', price: 30, description: 'Classic South Indian dosa', image: dosa },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-white">
      <br /><br />
      <h1 className="font-bold text-xl md:text-2xl ml-4 md:ml-10 text-lime-800 border-lime-950 border-2 w-32 md:w-40 p-1 rounded-xl">
        SNACKS
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
              onClick={() => addToCart(item, username)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
