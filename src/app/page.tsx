"use client";
import { SetStateAction, useState } from 'react';
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TracingBeam } from "@/components/ui/tracing-beam";
import NavBar from "@/components/NavBar";
import { Hero } from "@/components/Hero";
import RecommendationForm from '@/components/RecommendationForm';
import RecommendationResult from '@/components/RecommendationResult';
import{ GlobeDemo } from '@/components/GlobeDemo'

export default function Home() {
  const [recommendation, setRecommendation] = useState('');

  const handleRecommendation = (newRecommendation: SetStateAction<string>) => {
    setRecommendation(newRecommendation);
  };

  return (
    <>
      <NavBar />
      <main className="w-full">
        <BackgroundBeams />
        <div className="w-full">
          <Hero />
          <GlobeDemo/>
          {/* <RecommendationForm onRecommend={handleRecommendation} />
          {recommendation && <RecommendationResult recommendation={recommendation} />} */}
        </div>
      </main>
    </>
  );
}

