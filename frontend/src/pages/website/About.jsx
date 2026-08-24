import AboutCTA from "../../components/website/about/AboutCTA";
import AboutHero from "../../components/website/about/AboutHero";
import CraftProcess from "../../components/website/about/CraftProcess";
import OurPillars from "../../components/website/about/OurPillars";
import Sustainability from "../../components/website/about/Sustainability";
import WhoWeAre from "../../components/website/about/WhoWeAre";

export default function About() {
  return (
    <>
      <AboutHero />
      <WhoWeAre /> 
      <OurPillars />
      <CraftProcess />
      <Sustainability />
      <AboutCTA />
    </>
  );
}
