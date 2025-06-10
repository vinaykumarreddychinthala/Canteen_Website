
"use client";

import { CartContext } from '../context/CartContext'; // Adjust the import path if necessary
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import chickenimage from '../images/chicken.webp';
import muttonimage from '../images/mutton.jpg';
import vegimage from '../images/veg.jpeg';
import { useContext } from 'react';
import dumimage from '../images/dum.webp';
import fryimage from '../images/fry.jpeg';
import prawnsimage from '../images/prawns.jpeg';
export default function BiriyaniMenu(){
  const {data:session,status} = useSession();
  const username = session.user.name;
  const menuitems = [
    { id: 1, name: 'Chicken Biryani', price: 15, description: 'Spicy chicken biryani', image: chickenimage },
    { id: 2, name: 'Mutton Biryani', price: 20, description: ' mutton biryani', image: muttonimage },
    { id: 3, name: 'Veg Biryani', price: 20, description: 'Normal Veg-biryani', image: vegimage },
    { id: 4, name: 'Dum Biryani', price: 20, description: 'Normal Veg-biryani', image: dumimage },
    { id: 5, name: 'Fry-Piece Biryani', price: 20, description: 'Normal Veg-biryani', image: fryimage },
    { id: 6, name: 'prawns Biryani', price: 20, description: 'Normal Veg-biryani', image: prawnsimage },
  ];

  const { addToCart } = useContext(CartContext); 

  return (
    <div>
      <br /><br />
      <h1 className="font-bold text-2xl ml-10 text-lime-800 border-lime-950 pl-2 mt-4 border-2 w-40 rounded-xl">BIRIYANI&apos;S</h1>
      <div className="biryani-items grid grid-cols-3  ml-64 mr-48">
        {menuitems.map((item) => (
          <div key={item.id} className="menu-item border-lime-400 mb-6 border-2 mt-14 rounded-lg p-4 w-48 shadow-md">
            <Image src={item.image} alt={item.name} width={200} height={200} className="item-image" />
            <h2>{item.name}</h2>
            <p className='font-light'>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            {/* <button className='bg-lime-400 rounded-lg w-[130px] h-[25px]' onClick={()=>addToCart(item)}>Add to Cart</button> */}
            <button className='bg-lime-400 rounded-lg w-[130px] h-[35px] text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105' onClick={() => addToCart(item,username)} >Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

