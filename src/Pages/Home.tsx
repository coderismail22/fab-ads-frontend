import Banner from "@/components/Banner/Banner";
import Faq from "@/components/Faq/Faq";
import HomePageCategory from "@/components/HomePageCategory/HomePageCategory";
import Payments from "@/components/Payments/Payments";
import Services from "@/components/Services/Services";
import WhyBest from "@/components/WhyBest/WhyBest";

const Home = () => {
  // --primary-color: #ffc727;
  // --secondary-color: #9810fa;
  return (
    <div className="w-10/12 mx-auto">
      <Banner />
      <Payments />
      <HomePageCategory />
      <Services />
      <WhyBest />
      <Faq />
    </div>
  );
};

export default Home;
