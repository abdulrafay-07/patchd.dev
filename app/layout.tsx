import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "patchd",
  description: "The developer portfolio that doesn't suck",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
