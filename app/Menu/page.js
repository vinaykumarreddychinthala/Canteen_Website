"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import juiceimage from '../images/juices.jpeg';
import icecreamimage from '../images/icecream.jpeg';
import chickenimage from '../images/chicken.webp';
import snacksimage from '../images/snacks.jpeg';
import softdrinksimage from '../images/softdrinks.jpeg';

export default function Menu() {
    return (
        <div className="min-h-screen bg-white">
            <div className="py-8">
                <h1 className="font-bold text-xl md:text-2xl ml-4 md:ml-10 text-lime-800 border-lime-950 border-2 w-32 md:w-40 p-2 rounded-xl shadow-sm bg-white">
                    MENU
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-4 md:px-20">
                    <Link href="/juices" className="flex justify-center">
                        <div className="border-2 border-lime-500 rounded-xl w-full max-w-[260px] h-[280px] bg-white shadow-md hover:shadow-xl transition-all duration-200 flex flex-col items-center">
                            <Image className="mx-auto mt-4 rounded-lg object-cover" src={juiceimage} alt="Juices" width={200} height={200} />
                            <div className="text-center font-extrabold mt-3 text-lime-500 text-base md:text-lg">JUICES & SHAKES</div>
                        </div>
                    </Link>
                    <Link href="/snacks" className="flex justify-center">
                        <div className="border-2 border-lime-500 rounded-xl w-full max-w-[260px] h-[280px] bg-white shadow-md hover:shadow-xl transition-all duration-200 flex flex-col items-center">
                            <Image className="mx-auto mt-4 rounded-lg object-cover" src={snacksimage} alt="Snacks" width={200} height={200} />
                            <div className="text-center font-extrabold mt-3 text-lime-500 text-base md:text-lg">SNACKS</div>
                        </div>
                    </Link>
                    <Link href="/biriyani" className="flex justify-center">
                        <div className="border-2 border-lime-500 rounded-xl w-full max-w-[260px] h-[280px] bg-white shadow-md hover:shadow-xl transition-all duration-200 flex flex-col items-center">
                            <Image className="mx-auto mt-4 rounded-lg object-cover" src={chickenimage} alt="Biriyani" width={200} height={200} />
                            <div className="text-center font-extrabold mt-3 text-lime-500 text-base md:text-lg">BIRIYANI</div>
                        </div>
                    </Link>
                    <Link href="/softdrinks" className="flex justify-center">
                        <div className="border-2 border-lime-500 rounded-xl w-full max-w-[260px] h-[280px] bg-white shadow-md hover:shadow-xl transition-all duration-200 flex flex-col items-center">
                            <Image className="mx-auto mt-4 rounded-lg object-cover" src={softdrinksimage} alt="Cool Drinks" width={200} height={200} />
                            <div className="text-center font-extrabold mt-3 text-lime-500 text-base md:text-lg">COOL DRINKS</div>
                        </div>
                    </Link>
                    <Link href="/icecream" className="flex justify-center">
                        <div className="border-2 border-lime-500 rounded-xl w-full max-w-[260px] h-[280px] bg-white shadow-md hover:shadow-xl transition-all duration-200 flex flex-col items-center">
                            <Image className="mx-auto mt-4 rounded-lg object-cover" src={icecreamimage} alt="Ice Creams" width={200} height={200} />
                            <div className="text-center font-extrabold mt-3 text-lime-500 text-base md:text-lg">ICE CREAMS</div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

