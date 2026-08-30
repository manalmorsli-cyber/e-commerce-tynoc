import './globals.css';
import { CartProvider } from '@/context/CartContext';

export const metadata = {
  title: 'VeloceStore',
  description: 'Online Store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}