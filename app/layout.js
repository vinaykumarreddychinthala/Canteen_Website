// app/layout.js
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Providers from "./components/providers";
import Protected from "./components/protected";
import { CartProvider } from "./context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Providers>
          <Protected>
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  <header className="sticky top-0 z-30 bg-white shadow-sm">
                    <Navbar />
                  </header>
                  <main className="flex-1 w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-8 py-4">
                    {children}
                  </main>
                  <footer className="bg-lime-50 border-t border-lime-200 py-4 mt-8">
                    <Footer />
                  </footer>
                </div>
              </CartProvider>
          </Protected>
        </Providers>
      </body>
    </html>
  );
}