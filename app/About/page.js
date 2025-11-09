import React from "react";
import Image from "next/image";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/pic2.jpg";
import pic3 from "../images/pic3.jpeg";

const AboutSection = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-4">
            {/* Remove width constraints and let sections fill the screen */}
            <div className="space-y-10">
                {/* Welcome Section */}
                <section className="flex flex-col md:flex-row items-stretch gap-0 bg-white rounded-none shadow-md p-0 w-full">
                    <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                        <Image className="rounded-lg shadow-lg" src={pic1} alt="Canteen" width={440} height={320} />
                    </div>
                    <div className="w-full md:w-1/2 flex items-center p-8">
                        <div className="font-light tracking-wider text-lg md:text-2xl w-full">
                            <span className="font-semibold text-2xl md:text-3xl block mb-2">Welcome to IIT Goa canteen!</span>
                            At IIT Goa canteen, we believe that great food creates great moments. Our canteen is more than just a place to eat—it’s a space where students, staff, and visitors can gather, unwind, and enjoy delicious, wholesome meals. From nutritious breakfast options to hearty lunches and snacks, we are dedicated to offering a wide variety of fresh and tasty choices every day.
                        </div>
                    </div>
                </section>

                {/* Mission & Offerings */}
                <section className="flex flex-col md:flex-row items-stretch gap-0 bg-white rounded-none shadow-md p-0 w-full">
                    <div className="w-full md:w-1/2 flex items-center p-8">
                        <div className="w-full">
                            <b className="text-2xl md:text-3xl tracking-wider">Our Mission</b>
                            <div className="tracking-wider mt-4 text-lg md:text-2xl font-light">
                                Our mission is simple: to provide our community with high-quality, affordable meals that cater to all tastes and dietary preferences. Whether you're in a rush or want to relax with friends, we strive to offer a welcoming atmosphere with quick service and food that fuels both body and mind.
                            </div>
                            <div className="mt-6">
                                <b className="tracking-wider text-2xl md:text-3xl">What we offer</b>
                                <span className="block text-lg md:text-2xl font-light tracking-wider mt-2">We understand that everyone's tastes and needs are different. That's why we offer:</span>
                                <ul className="text-base md:text-xl font-light tracking-wider list-disc ml-6 mt-2 space-y-1">
                                    <li><b>Healthy options</b>: Fresh salads, wholesome sandwiches, and fruit bowls for a balanced diet.</li>
                                    <li><b>Comfort food</b>: Warm meals like pastas, curries, and daily specials that feel like home.</li>
                                    <li><b>Snacks and beverages</b>: A selection of snacks, fresh juices, smoothies, and coffee to keep you energized throughout the day.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                        <Image className="rounded-lg shadow-lg" src={pic2} alt="Mission" width={400} height={300} />
                    </div>
                </section>

                {/* Values & Story */}
                <section className="flex flex-col md:flex-row items-stretch gap-0 bg-white rounded-none shadow-md p-0 w-full">
                    <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                        <Image className="rounded-lg shadow-lg" src={pic3} alt="Values" width={440} height={320} />
                    </div>
                    <div className="w-full md:w-1/2 flex items-center p-8">
                        <div className="w-full">
                            <b className="text-2xl md:text-3xl">Our Values</b>
                            <ol type="1" className="text-base md:text-xl font-light list-decimal ml-6 mt-2 space-y-1">
                                <li><b>Fresh Ingredients</b>: We are committed to using the freshest ingredients, sourced from trusted suppliers, to ensure the highest quality in every dish.</li>
                                <li><b>Sustainability</b>: We aim to reduce waste by offering eco-friendly packaging and promoting sustainable practices.</li>
                                <li><b>Customer Experience</b>: Our friendly team works hard to provide excellent service, ensuring your canteen experience is quick, smooth, and enjoyable.</li>
                            </ol>
                            <b className="text-2xl md:text-3xl block mt-6">Our Story</b>
                            <div className="text-lg md:text-2xl font-light mt-2">
                                Founded in 2016, IIT Goa canteen was created to offer a vibrant dining space for the Goa. We started with the simple idea of making good food accessible to everyone, and over the years, we’ve grown into a beloved part of the daily routine for many. We take pride in the relationships we’ve built with our regulars and are always excited to welcome new faces!
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team & Join Us */}
                <section className="grid md:grid-cols-2 gap-0">
                    <div className="bg-white rounded-none shadow-md p-8">
                        <b className="text-2xl md:text-3xl">Meet Our Team</b>
                        <div className="text-lg md:text-2xl font-light mt-2">
                            Our kitchen and service teams are at the heart of what we do. Led by Karthik, our staff is dedicated to preparing meals with care and precision, ensuring every bite is as satisfying as the last.
                        </div>
                    </div>
                    <div className="bg-white rounded-none shadow-md p-8">
                        <b className="text-2xl md:text-3xl">Join Us</b>
                        <div className="text-lg md:text-2xl font-light mt-2">
                            Come and experience the vibrant atmosphere at IIT Goa canteen. Whether you’re grabbing a quick bite or sitting down for a meal with friends, we promise to make every visit enjoyable!
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutSection;