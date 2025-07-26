import React from "react";
export default function Footer() {
    return (
        <footer className="bg-lime-500 text-white text-center px-4 py-4">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
                <span className="text-sm md:text-base">
                    &copy; 2024 Goa Canteen
                </span>
                <span className="text-xs md:text-sm">
                    Terms of Use / Privacy Policy / Privacy Request / Code of Business Conduct
                </span>
            </div>
        </footer>
    );
}