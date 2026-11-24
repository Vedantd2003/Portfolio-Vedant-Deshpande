import { AIChat } from "@/components/AIChat";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { ModeProvider } from "@/components/ModeProvider";
import { Nav } from "@/components/Nav";
import { ReelProvider } from "@/components/ReelViewer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { About } from "@/sections/About";
import { Contact } from "@/sections/Contact";
import { CreativeLab } from "@/sections/CreativeLab";
import { Ecosystem } from "@/sections/Ecosystem";
import { EngineeringLab } from "@/sections/EngineeringLab";
import { Hero } from "@/sections/Hero";
import { Manifesto } from "@/sections/Manifesto";
import { ModeSwitch } from "@/sections/ModeSwitch";
import { Process } from "@/sections/Process";
import { Showreel } from "@/sections/Showreel";

export default function Home() {
  return (
    <ModeProvider>
      <ReelProvider>
        <Loader />
        <SmoothScroll />
        <Cursor />
        <div className="grain" aria-hidden="true" />
        <div className="dev-grid" aria-hidden="true" />
        <Nav />
        <main id="main">
          <Hero />
          <Manifesto />
          <ModeSwitch />
          <CreativeLab />
          <Showreel />
          <EngineeringLab />
          <Process />
          <About />
          <Ecosystem />
          <Contact />
        </main>
        <AIChat />
      </ReelProvider>
    </ModeProvider>
  );
}
