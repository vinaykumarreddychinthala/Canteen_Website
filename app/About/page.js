import React from "react";
import Image from "next/image";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.jpg";
import pic3 from "../images/pic3.jpeg";
const aboutSection=()=>{
    return (
        <div>
            <div className="flex flex-row h-150">
                <Image className="m-10 shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-lg my-10" src={pic1} alt="" width={500} height={350}/>
                <div className="p-10 my-4 font-light tracking-wider text-2xl">Welcome to IIT Goa canteen! <br />At IIT Goa canteen, we believe that great food creates great moments. Our canteen is more than just a place to eat—it’s a space where students, staff, and visitors can gather, unwind, and enjoy delicious, wholesome meals. From nutritious breakfast options to hearty lunches and snacks, we are dedicated to offering a wide variety of fresh and tasty choices every day.</div>
            </div>
                <br /><br />
                <hr />
            <div className="flex flex-row">
                <div className="p-10">
                    <b className="text-3xl tracking-wider">Our Mission </b><br />
                    <div className="tracking-wider m-15 text-2xl font-light">
                        Our mission is simple: to provide our community with high-quality, affordable meals that cater to all tastes and dietary preferences. Whether you`&apos;`re in a rush or want to relax with friends, we strive to offer a welcoming atmosphere with quick service and food that fuels both body and mind.
                    </div>
                    <br />
                    <div>
                        <b className="tracking-wider text-3xl">What we offer</b><br />
                        <span className="text-2xl font-light tracking-wider">we understand that everyone`&apos;`s tastes and needs are different.That`&apos;`s why we offer:</span>
                        <ul className="text-1xl font-light tracking-wider" itemType="circle">
                            <li><b>Healthy options</b>: Fresh salads, wholesome sandwiches, and fruit bowls for a balanced diet.</li>
                            <li><b>Comfort food</b>: Warm meals like pastas, curries, and daily specials that feel like home.</li>
                            <li><b>Snacks and beverages</b>: A selection of snacks, fresh juices, smoothies, and coffee to keep you energized throughout the day.</li>
                        </ul>
                    </div>
                </div>
                <Image className="m-10 shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-lg" src={pic2} alt="" width={400} height={300}/>
                <br /><br /><br />
            </div>
            <br /><br /><hr />
            <div className="flex flex-row">
                <Image className="m-10 shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-lg" src={pic3} alt="" width={550} height={350}/>
                <div className="m-10">
                    <b className="text-3xl">Our Values</b>
                    <br />
                    <ol type="1" className="text-xl font-light">
                        <li><b>Fresh Ingredients</b>: We are committed to using the freshest ingredients, sourced from trusted suppliers, to ensure the highest quality in every dish.</li>
                        <li><b>Sustainability</b>: We aim to reduce waste by offering eco-friendly packaging and promoting sustainable practices.</li>
                        <li><b>Customer Experience</b>: Our friendly team works hard to provide excellent service, ensuring your canteen experience is quick, smooth, and enjoyable.</li>
                    </ol>
                    <br />
                    <b className="text-3xl">Our Story</b>
                    <div className="text-2xl font-light">Founded in 2016, IIT Goa canteen was created to offer a vibrant dining space for the Goa. We started with the simple idea of making good food accessible to everyone, and over the years, we’ve grown into a beloved part of the daily routine for many. We take pride in the relationships we’ve built with our regulars and are always excited to welcome new faces!</div>
                </div>
            </div>
            <br /><br />
            <div className="m-10">
                <b className="text-3xl">Meet Our team</b>
                <div className="text-2xl font-light">Our kitchen and service teams are at the heart of what we do. Led by Karthik, our staff is dedicated to preparing meals with care and precision, ensuring every bite is as satisfying as the last.</div>
            </div>
            <div className="m-10">
                <b className="text-3xl">Join Us</b>
                <div className="text-2xl font-light">Come and experience the vibrant atmosphere at IIT Goa canteen. Whether you’re grabbing a quick bite or sitting down for a meal with friends, we promise to make every visit enjoyable!</div>
            </div>
        </div>
    );
}
export default aboutSection;