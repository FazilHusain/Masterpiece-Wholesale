import HeroSlider from "../../components/website/home/HeroSlider";
import NewArrivalBanner from "../../components/website/home/NewArrivalBanner";
import TradeCards from "../../components/website/home/TradeCards";
import TradeHighlights from "../../components/website/home/TradeHighlights";
import NewArrivalProducts from "../../components/website/home/NewArrivalProducts";
import JournalSection from "../../components/website/home/JournalSection";
import CategoryStrip from "../../components/website/home/CategoryStrip";
import CategoryShowcase from "../../components/website/home/CategoryShowcase";
import ContactForm from "../../components/website/contact/ContactForm";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <CategoryStrip />
      <TradeHighlights />
      <TradeCards />
      <NewArrivalBanner />
      <NewArrivalProducts />
      <CategoryShowcase />
      {/* <CategorySection/> */}
      <ContactForm />
      <JournalSection />
    </>
  );
}
