import type { Metadata } from "next";
import "./globals.css";
import Cookies from "js-cookie"
import Header from "@/components/header";
import dotenv from "dotenv"

dotenv.config()

export const metadata: Metadata = {
  title: "MeetEase",
  description: "Веб-приложения для проведения веб-конференций",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-skyBlue">
        <Header />
        {children}
      </body>
    </html>
  );
}
