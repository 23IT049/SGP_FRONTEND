import { useEffect } from "react";
import NewsList from "../../News/NewsList";
import SwiperSlider from "../Slider/SwiperSlider";
import Marketplace from "../../MarketPlace/MarketPlace";
import Events from "../../Events/Event";
import ItemsList from "../../Items/Stamps/ItemsList";
import FeaturedProduct from "../../FeaturedProduct/FeaturedProduct";
import Testimonial from "../../Testinomial/Testinomial";
import Statistics from "../../Statistics/Statistics";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="p-4">
      <SwiperSlider />
      <Marketplace/>
      <NewsList />
      <Events />
      <ItemsList />
      <FeaturedProduct/>
      <Testimonial/>
      <Statistics />
    </div>
  );
}

export default Home;
