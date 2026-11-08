import { findContact } from "../data/about";
import SolarHero from "./solar/SolarHero";

export default function Hero() {
  return <SolarHero email={findContact("EMAIL")?.href} />;
}
