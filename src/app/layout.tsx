import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import CartProvide from "@/context/cart";
import UserProvider from "@/context/user";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "RedStay - Seu descanço nossa felicidade",
  description: "Alugue seu quarto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <UserProvider>
          <CartProvide>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
            <Header />
            {children}
          </CartProvide>
        </UserProvider>
      </body>
    </html>
  );
}
