"use client";
import React from "react";
import { CartContext } from '../context/CartContext'; // Import the Cart Context
import { useContext } from "react";
import Image from "next/image";
import vanillaimage from '../images/vanilla.jpg';
import chocolateimage from '../images/chocolate.jpg';
import butterscotchimage from '../images/butterscotch.jpeg';
import pistachioimage from '../images/pistachio.webp';
import strawberryimage from '../images/strawberry.webp';
import caramelimage from '../images/caramel.jpg';
import { useSession } from "next-auth/react";

export default function IceCreamMenu() {
  const {data:session,status} = useSession();
  const username = session.user.name;
  const menuItems = [
    { id: 1, name: 'Vanilla', price: 10, description: 'Vanilla ice cream', image: vanillaimage },
    { id: 2, name: 'Chocolate', price: 20, description: 'Chocolate ice cream', image: chocolateimage},
    { id: 3, name: 'Butterscotch', price: 30, description: 'Butterscotch ice cream', image:butterscotchimage},
    { id: 4, name: 'pistachio', price: 30, description: 'pistachio ice cream', image:pistachioimage},
    { id: 5, name: 'strawberry', price: 30, description: 'strawberry ice cream', image:strawberryimage},
    { id: 6, name: 'caramel', price: 30, description: 'caramel ice cream', image:caramelimage},
  ];

  const { addToCart } = useContext(CartContext); // Access addToCart function

  return (
    <div><br /><br />
      <h1 className="font-bold text-2xl ml-10 text-lime-800 border-lime-950 border-2 w-40 rounded-xl">ICE CREAMS</h1>
      <div className="icecreams grid  ml-48 mr-36 grid-cols-3">
        {menuItems.map(item => (
          <div key={item.id} className="menu-ice border-lime-400 border-2 rounded-lg mb-10 mt-10 p-4 w-[250px] shadow-md">
            <Image src={item.image} alt={item.name} width={200} height={150} />
            <h2 className="font-serif font-bold">{item.name}</h2>
            <p className="font-light">{item.description}</p>
            <p>Price:  ₹{item.price}</p>
            {/* <button className="bg-lime-400 w-[130px] h-[30px] rounded-xl" onClick={() => addToCart(item)}>Add</button> Use addToCart */}
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
