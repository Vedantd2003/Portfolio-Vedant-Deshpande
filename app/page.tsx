import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import FeaturedProject from "@/components/FeaturedProject";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navigation />
      <Hero />
      <div className="section-divider" />
      <About />
      <div className="section-divider" />
      <Projects />
      <FeaturedProject />
      <div className="section-divider" />
      <Skills />
      <div className="section-divider" />
      <Contact />
      <Footer />
      <AIChat />
    </main>
  );
}
