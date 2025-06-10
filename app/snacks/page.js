"use client";

import { CartContext } from '../context/CartContext'; // Adjust the import path if necessary
import { useContext } from 'react';
import Image from 'next/image';
import noodles from '../images/noodles.jpg';
import sandwich from '../images/sandwich.jpeg';
import french from '../images/french.jpeg';
import rice from '../images/rice.jpeg';
import samosa from '../images/samosa.jpg';
import dosa from '../images/dosa.jpeg';
import { useSession } from 'next-auth/react';
export default function BiriyaniMenu(){
  const {data:session,status} = useSession();
  const username = session.user.name;
  const menuitems = [
    { id: 1, name: 'Noodles', price: 15, description: 'Spicy chicken biryani', image:noodles},
    { id: 2, name: 'Sandwich', price: 20, description: ' mutton biryani', image: sandwich },
    { id: 3, name: 'French fries', price: 20, description: 'Normal Veg-biryani', image: french},
    { id: 4, name: 'Chicken fried rice', price: 20, description: 'Normal Veg-biryani', image: rice},
    { id: 5, name: 'Samosa', price: 20, description: 'Normal Veg-biryani', image:samosa},
    { id: 6, name: 'dosa', price: 20, description: 'Normal Veg-biryani', image: dosa},
  ];

  // Use the addToCart function from the context
  const { addToCart } = useContext(CartContext); // This should work if the context is properly provided

  return (
    <div>
      <br /><br />
      <h1 className="font-bold text-2xl ml-10 text-lime-800 border-lime-950 pl-2 mt-4 border-2 w-36 rounded-xl">SNACKS</h1>
      <div className="biryani-items grid grid-cols-3  ml-64 mr-48">
        {menuitems.map((item) => (
          <div key={item.id} className="menu-item border-lime-400 mb-6 border-2 mt-14 rounded-lg p-4 w-48 shadow-md">
            <Image src={item.image} alt={item.name} width={200} height={200} className="item-image" />
            <h2>{item.name}</h2>
            <p className='font-light'>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            {/* <button className='bg-lime-400 rounded-lg w-[130px] h-[25px]' onClick={()=>addToCart(item)}>Add to Cart</button> */}
            <button 
  className='bg-lime-400 rounded-lg w-[130px] h-[35px] text-white font-semibold transition duration-300 ease-in-out transform hover:bg-lime-500 hover:shadow-lg hover:scale-105' 
  onClick={() => addToCart(item,username)}
>
  Add to Cart
</button>

          </div>
        ))}
      </div>
    </div>
  );
}
