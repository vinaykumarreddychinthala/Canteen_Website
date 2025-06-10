
"use client";

import { CartContext} from '../context/CartContext'; // Adjust the import path if necessary
import { useContext } from 'react';
import Image from 'next/image';
import coke from '../images/coke.jpeg';
import thump from '../images/thump.jpg';
import mirinda from '../images/mirinda.jpeg';
import pepsi from '../images/pepsi.jpeg';
import jeera from '../images/jeera.jpg';
import up from '../images/7up.jpeg';
import { useSession } from 'next-auth/react';
export default function BiriyaniMenu(){
  const {data:session,status} = useSession();
  const username = session.user.name;
  const menuitems = [
    { id: 1, name: 'Coke', price: 150, description: 'Spicy chicken biryani', image: coke},
    { id: 2, name: 'ThumpsUP', price: 200, description: ' mutton biryani', image:thump},
    { id: 3, name: 'Mirinda', price: 25, description: 'Normal Veg-biryani', image: mirinda},
    { id: 4, name: 'Pepsi', price: 25, description: 'Normal Veg-biryani', image: pepsi},
    { id: 5, name: ' Jeera', price: 25, description: 'Normal Veg-biryani', image: jeera},
    { id: 6, name: '7Up', price: 20, description: 'Normal Veg-biryani', image: up},
  ];

  // Use the addToCart function from the context
  const { addToCart } = useContext(CartContext); // This should work if the context is properly provided

  return (
    <div>
      <br /><br />
      <h1 className="font-bold text-2xl ml-10 text-lime-800 border-lime-950 pl-2 mt-4 border-2 w-40 rounded-xl">COOL DRINKS</h1>
      <div className="biryani-items grid grid-cols-3  ml-64 mr-48">
        {menuitems.map((item) => (
          <div key={item.id} className="menu-item border-lime-400 mb-6 border-2 mt-14 rounded-lg p-4 w-48 shadow-md">
            <Image src={item.image} alt={item.name} width={200} height={200} className="item-image" />
            <h2>{item.name}</h2>
            <p className='font-light'>{item.description}</p>
            <p>Price: ₹{item.price}</p>
            <button className='bg-lime-400 rounded-lg w-[130px] h-[25px]' onClick={()=>addToCart(item,username)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
