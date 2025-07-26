"use client";

import { CartContext } from '../context/CartContext';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import chickenimage from '../images/chicken.webp';
import muttonimage from '../images/mutton.jpg';
import vegimage from '../images/veg.jpeg';
import { useContext } from 'react';
import dumimage from '../images/dum.webp';
import fryimage from '../images/fry.jpeg';
import prawnsimage from '../images/prawns.jpeg';

export default function BiriyaniMenu() {
  const { data: session, status } = useSession();
  const username = session?.user?.name;
  const menuitems = [
    { id: 1, name: 'Chicken Biryani', price: 15, description: 'Spicy chicken biryani', image: chickenimage },
    { id: 2, name: 'Mutton Biryani', price: 20, description: 'Mutton biryani', image: muttonimage },
    { id: 3, name: 'Veg Biryani', price: 20, description: 'Normal Veg-biryani', image: vegimage },
    { id: 4, name: 'Dum Biryani', price: 20, description: 'Dum style biryani', image: dumimage },
    { id: 5, name: 'Fry-Piece Biryani', price: 20, description: 'Fried piece biryani', image: fryimage },
    { id: 6, name: 'Prawns Biryani', price: 20, description: 'Prawns biryani', image: prawnsimage },
  ];

  const { addToCart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-white">
      <br /><br />
      <h1 className="font-bold text-xl md:text-2xl ml-4 md:ml-10 text-lime-800 border-lime-950 border-2 w-40 md:w-52 p-1 rounded-xl">
        BIRIYANI&apos;S
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

