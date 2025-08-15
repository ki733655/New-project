import { Inter } from "next/font/google";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'TrackMate',
};
interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({ children }:  RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastContainer />
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
