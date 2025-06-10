import Link from "next/link";
import Image from "next/image";
import cartimage from "../images/shopping-cart.png";
export default function Navbar(){
    return (
        <div className="bg-lime-500 h-18  text-white flex space-x-4 justify-between ">
            <div className="p-3 mx-3">logo</div>
            <div className="">
                <ul className="flex space-x-10 p-3">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/About">About</Link></li>
                    <li><Link href="/Menu">Menu</Link></li>
                    <li><Link href="/Cart"><Image src={cartimage} alt="" width={30} height={20}/></Link></li>
                    {/* <li><Link href="/signup"><Image src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20fill%3D%22none%22%20d%3D%22M0%200h24v24H0V0z%22%2F%3E%3Cpath%20fill%3D%22%23f8f8f8%22%20d%3D%22M12%2012c2.21%200%204-1.79%204-4s-1.79-4-4-4-4%201.79-4%204%201.79%204%204%204zm0%202c-2.67%200-8%201.34-8%204v1c0%20.55.45%201%201%201h14c.55%200%201-.45%201-1v-1c0-2.66-5.33-4-8-4z%22%20class%3D%22color000000%20svgShape%22%2F%3E%3C%2Fsvg%3E" alt="" width={38} height={30}  /></Link></li> */}
                </ul>
            </div>
        </div>
    );
}