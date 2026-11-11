import Background from "./components/Background";
import BlackHole from "./components/blackhole/BlackHole";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Hero from "./components/Hero";
import MoreBuilds from "./components/MoreBuilds";
import PetrovaThread from "./components/PetrovaThread";
import Wins from "./components/Wins";
import { findContact } from "./data/about";

export default function Home() {
  const email = findContact("EMAIL")?.href;

  return (
    <>
      <Hero />
      <div className="relative">
        <PetrovaThread />
        <Experience />
        <MoreBuilds />
        <Wins />
        <Background />
        <Contact />
      </div>
      <BlackHole email={email} />
    </>
  );
}
