"use client";
import React from "react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import Image from "next/image";
const people = [
  {
    id: 1,
    name: "Dinajara",
    designation: "",
    image: "/dinajara.jpg",
      
  },
  {
    id: 2,
    name: "Prageeth",
    designation: "",
    image: "/prageeth.jpg"
},
  {
    id: 3,
    name: "Chalani",
    designation: "",
    image:
      "",
  },
  {
    id: 4,
    name: "Manula",
    designation: "",
    image: "/manula.jpg"
   
  },
  {
    id: 5,
    name: "Janith",
    designation: "",
    image: "/janith.jpg"
      
  }
];

export function GroupList() {
  return (
    <div className="-mt-6 md:mt-28">
        <div className="flex justify-center mb-16">
            <h1 className="text-center font-thin text-md">Our Team😉❤️</h1>
        </div>
        <div className="flex flex-row items-center justify-center mb-10 w-full">
            <AnimatedTooltip items={people} />
        </div>
    </div>
    
  );
}
