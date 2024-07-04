import React from 'react';
import { WavyBackground } from "@/components/ui/wavy-background";
import { Button } from "@/components/ui/moving-border";
import Link from 'next/link';

export const Hero = () => {
  return (
    <WavyBackground className=''>
      <section className="flex flex-col items-center justify-center text-center -mt-28 text-white px-6 md:px-8">
        <h1 className="md:text-[100px] text-4xl font-bold mb-8">TRAVELGENIUS</h1>
        <p className="text-lg md:text-3xl mb-2">Discover Your Perfect Travel Destination</p><br />
        <p className="text-sm md:text-lg text-green-100 mx-4 mb-10">( Personalized travel and camping site recommendations based on your preferences and budget :-)</p>
        <div className="flex justify-center space-x-4 mt-6 w-full px-4 md:w-auto">
          <Link href="/recommendation">
            <Button className='text-xl md:text-2xl font-thin px-5'>
              Find Your Spot
            </Button>
          </Link>
        </div>
      </section>
    </WavyBackground>
  );
};
