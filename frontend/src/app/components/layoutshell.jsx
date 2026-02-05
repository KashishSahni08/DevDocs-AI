"use client";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LayoutShell({ children }) {
  const pathname = usePathname();

  const isBuilder = pathname.startsWith("/builder");

  return (
    <>
      {!isBuilder && <Navbar />}
      {children}
      {!isBuilder && <Footer />}
    </>
  );
}