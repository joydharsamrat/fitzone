import BenefitsSection from "../components/home/BenefitsSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero from "../components/home/Hero";
import ImageGallery from "../components/home/ImageGallery";
import NewProducts from "../components/home/NewProducts";
import OnSale from "../components/home/OnSale";
import ProductCategories from "../components/home/ProductCategories";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <OnSale />
      <NewProducts />
      <Testimonials />
      <BenefitsSection />
      <ImageGallery />
    </>
  );
};

export default Home;
