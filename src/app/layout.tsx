import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import dotenv from "dotenv"

dotenv.config()

export const metadata: Metadata = {
  title: "MeetEase",
  description: "Веб-приложение для проведения веб-конференций",
};

interface IRootLayout {
  children: React.ReactNode
}

export default function RootLayout({ children }: IRootLayout) {
  return (
      <html lang="en">
        <body className="bg-skyBlue">
          {children}
        </body>
      </html>
  );
}
