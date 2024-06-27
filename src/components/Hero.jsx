import React from 'react';
import { WavyBackground } from "@/components/ui/wavy-background";
import { Button } from "@/components/ui/moving-border";
import Link from 'next/link';

export const Hero = () => {
  return (
    <WavyBackground className=' min-w-full'>
      <section className="flex flex-col items-center justify-center text-center text-white px-4 md:px-8">
        <h1 className="md:text-[100px] text-4xl font-bold mb-8">TRAVELGENIUS</h1>
        <p className="text-md md:text-3xl mb-2">Discover Your Perfect Travel Destination</p>
        <p className="text-sm md:text-lg text-green-100 mx-4 mb-16">Personalized travel and camping site recommendations based on your preferences and budget.</p>
        <div className="flex space-x-4 mt-16">
          <Link href="/login" >
            <Button className='text-2xl font-thin'>
             Find Your Spot
            </Button>
          </Link>
        </div>
      </section>
    </WavyBackground>
  );
};
