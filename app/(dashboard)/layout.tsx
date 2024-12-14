import type { Metadata } from "next";
import Navbar from "../_components/nav/Navbar";
import Footer from "../_components/Footer";
import {fetchData} from "../_util/fetchData";
// import NProgressProvider from "../_util/NProgressProvider";
import "./globals.css";
import './progress.css';
import GlobalContext from "../_util/GlobalContext";
// import { Suspense } from "react";


export const metadata: Metadata = {
  title: "Aleen Store",
  description: "Aleen store",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const storeMenu = await fetchData("api/sections");

  return (
    <html lang="ar" dir="rtl">
      <body>
        <GlobalContext>
          <Navbar storeMenu={storeMenu} />
          {children}
          <Footer storeMenu={storeMenu} />
        </GlobalContext>
      </body>
    </html>
  );
}
