"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import Login from "@/components/Login/Login";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
import MainLayout from "@/components/layout/Header/Header";


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
        <ToastContainer />
        {decider ? (
          <Login />
        ) : (
          <MainLayout>
            {children}
          </MainLayout>
        )}
      </body>
    </html>
  );
}
