import BenefitsSection from "../components/home/BenefitsSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero from "../components/home/Hero";
import ImageGallery from "../components/home/ImageGallery";
import ProductCategories from "../components/home/ProductCategories";
import Testimonials from "../components/home/Testimonials";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <Testimonials />
      <BenefitsSection />
      <ImageGallery />
    </>
  );
};

export default Home;
