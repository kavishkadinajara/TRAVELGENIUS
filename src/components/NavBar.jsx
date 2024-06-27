"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.1) {
        setVisible(true);
      } else {
        setVisible(direction < 0);
      }
    }
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="text-white shadow-lg fixed top-0 inset-x-0 z-[5000]"
        >
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-6">
            {/* Left-aligned logo */}
            <div className="flex items-end">
              <Link href="/" passHref>
                <Image src={"/logo.png"} width={65} height={65} alt={"Logo"} />
              </Link>
            </div>

            {/* Center-aligned site name */}
            <div className="flex-grow text-center">
              <span className="text-3xl font-bold">TRAVELGENIUS</span>
            </div>

            {/* Right-aligned login link */}
            <div className="flex items-center">
              <Link href="/login" passHref>
                <p className="hover:text-gray-300">Login</p>
              </Link>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
