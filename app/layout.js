// app/layout.js
import "./globals.css";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Providers from "./components/providers";
import Protected from "./components/protected";
import { CartProvider } from "./context/CartContext";
import { OrderStatusProvider } from "./context/orderStatus";

export default function RootLayout({ children}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Protected>
            <OrderStatusProvider>
              <CartProvider>
                  <div className="flex flex-col min-h-screen">
                    <header className="h-10">
                      <Navbar />
                    </header>
                    <main className="h-70">
                      {children}
                    </main>
                    <footer className="h-1">
                      <Footer />
                    </footer>
                  </div>
              </CartProvider>
            </OrderStatusProvider>
          </Protected>
        </Providers>
      </body>
    </html>
  );
}