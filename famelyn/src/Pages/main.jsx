import Header from "./Header/header";
import Hero from "./Hero/Hero";
import ProblemSection from "./ProblemSection/ProblemSection";
import Framework from "./Framework/Framework";
import FaqSection from "./FaqSection/FaqSection";
import USPSection from "./USPSection/USPSection";
import HighPerformingPosts from "./components/HighPerformingPosts";
import { InnerCircle } from "./components/InnerCircle";
import SignalSection from "./components/SignalSection";
import TestimonialsMain from "./Testimonials/Testimonials";

function Mainmodule() {
  return (
    <>
      <Header />
      <Hero />
      <ProblemSection/>
      <Framework/>
     
      <USPSection/>
      <HighPerformingPosts/>
      
      <SignalSection/>
      <TestimonialsMain/>
      {/* <FaqSection/> */}
      <InnerCircle/>
       
      
    </>
  );
}

export default Mainmodule;
