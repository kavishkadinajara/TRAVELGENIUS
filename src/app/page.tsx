import { BackgroundBeams } from "@/components/ui/background-beams";
import { TracingBeam } from "@/components/ui/tracing-beam";
import NavBar from "@/components/NavBar";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="w-full">
        <BackgroundBeams />
        <div className="w-full">
          <Hero />
        </div>
      </main>
    </>
  );
}
