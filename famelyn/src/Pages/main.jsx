import Header from "./Header/header";
import Hero from "./Hero/Hero";
import ProblemSection from "./ProblemSection/ProblemSection";
import Framework from "./Framework/Framework";
import FaqSection from "./FaqSection/FaqSection";
import USPSection from "./USPSection/USPSection";
import HighPerformingPosts from "./components/HighPerformingPosts";
import ImageSlider from "./components/ImageSlider";
import { InnerCircle } from "./components/InnerCircle";
import SignalSection from "./components/SignalSection";

function Mainmodule() {
  return (
    <>
      <Header />
      <Hero />
      <ProblemSection/>
      <Framework/>
     
      <USPSection/>
      <HighPerformingPosts/>
      <ImageSlider/>
      
      <SignalSection/>
      {/* <FaqSection/> */}
      <InnerCircle/>
       
      
    </>
  );
}

export default Mainmodule;