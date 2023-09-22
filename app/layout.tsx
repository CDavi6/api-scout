"use client"

import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "../src/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <body className={inter.className}>{children}</body>
          <Toaster />
        </ThemeProvider>
      </html>
    </Provider>
  );
}
