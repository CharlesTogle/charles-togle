import About from "./components/About";
import AgenticTools from "./components/AgenticTools";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <AgenticTools />
      <Projects />
      <Experience />
      <Skills />
      <Footer />
    </>
  );
}
