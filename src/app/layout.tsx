import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import '../Style/scrollbar.css'
import { BackgroundBeams } from "@/components/ui/background-beams";
import { twMerge } from "tailwind-merge";
import { TracingBeam } from "@/components/ui/tracing-beam";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TRAVEL GENIUS",
  description: "find your best spot to travel...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
      <BackgroundBeams />
      <TracingBeam className="">
        <div className="relative z-10 w-full">
          {children}
        </div>
      </TracingBeam>
      <Footer/>
      </body>
    </html>
  );
}
