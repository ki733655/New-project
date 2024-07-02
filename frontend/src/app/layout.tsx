"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Login from "./components/Login/Login";

const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathName = usePathname();
  const decider = pathName == "/login";

  return (
    <html lang="en">
      <body className={inter.className}>
        {
          decider ? (
            <Login />
          ) : (
            <>
             <Header>
               <div className="min-h-[80vh] ">
                      {children}
                </div>
             </Header>
            <Footer />
            </>
          )
        }
      </body>
    </html >
  );
}
