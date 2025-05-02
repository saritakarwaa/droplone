import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Providers } from "./providers";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Droplone",
  description: "Secure cloud storage for your images, powered by ImageKit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      variables: {
        colorPrimary: "#000000",
        colorText: "#000000",
        colorTextSecondary: "#6B7280",
        colorBackground: "#FFFFFF",
        colorInputBackground: "#FFFFFF",
        colorShimmer: "rgba(0,0,0,0.07)",
      },
      elements: {
        formButtonPrimary: "bg-black hover:bg-gray-800",
        socialButtonsBlockButton: "border-gray-200 hover:bg-gray-50",
      },
    }}
      >
      <html lang="en" className="dark">
        <body
          className={`${inter.variable} antialiased bg-background text-foreground`}
        >
          <Providers>
          {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}