import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import "./globals.css";

import { QueryProvider } from "@/components/query-provider";
import { Toaster } from "@/components/ui/sonner";

const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

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
        className={`${font.className} antialiased`}
      >
        <QueryProvider>
          <Toaster />
          <NuqsAdapter>
            {children}
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
