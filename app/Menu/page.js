"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import juiceimage from '../images/juices.jpeg';
import icecreamimage from '../images/icecream.jpeg';
import chickenimage from '../images/chicken.webp';
import snacksimage from '../images/snacks.jpeg';
import softdrinksimage from '../images/softdrinks.jpeg';

// import softdrinks from "softdrinks/page";

export default function Menu(){
    return (
        <div>
          <br /><br />
          <h1 className="font-bold text-2xl ml-10 text-lime-800 border-lime-950 border-2 w-24 p-1 rounded-xl">MENU</h1>
            <div className="grid grid-cols-3 mt-10  ml-48 mr-44">
        <Link href="/juices">
          <div className="border-2 border-lime-500 border-solid rounded w-[220px] h-[260px]">
            <Image className="ml-2 mt-1" src={juiceimage} alt="" width={200} height={200}/>
            <div className="text-center font-extrabold mt-2 text-lime-500">JUICES & SHAKES</div>
          </div>
        </Link>
        <Link href="/snacks">
          <div className="border-2 border-lime-500 border-solid rounded w-[220px] h-[260px]">
            <Image className="mx-1 my-2" src={snacksimage} alt="" width={200} height={200}/>
            <div className=" my-2 text-center font-extrabold text-lime-500">SNACKS</div>
          </div>
        </Link>
        <Link href="/biriyani">
          <div className="border-2 border-lime-500 border-solid rounded w-[220px] h-[260px]">
            <Image className="mx-2 my-1" src={chickenimage}  alt="" width={200} height={200} />
            <div className="text-center font-extrabold my-3 text-lime-500">BIRIYANI</div>
          </div>
        </Link>
        <Link href="/softdrinks">
          <div className="border-2 mt-10 border-lime-500 border-solid rounded w-[220px] h-[260px]">
            <Image className="mx-1 my-1" src={softdrinksimage} alt="" width={200} height={200}/>
            <div className="text-center font-extrabold my-4 text-lime-500">COOL DRINKS</div>
          </div>
        </Link>
        <Link href="/icecream">
          <div className="border-2 my-10 border-lime-500 border-solid rounded w-[220px] h-[260px]">
            <Image className="mx-1 my-1" src={icecreamimage} alt="" width={200}  height={200}/>
            <div className="text-center font-extrabold my-3 text-lime-500">ICE CREAMS</div>
          </div>
        </Link>
      </div>
        </div>
    )
}

