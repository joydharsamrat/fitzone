import BenefitsSection from "../components/home/BenefitsSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import Hero from "../components/home/Hero";
import ImageGallery from "../components/home/ImageGallery";
import ProductCategories from "../components/home/ProductCategories";

const Home = () => {
  return (
    <>
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <BenefitsSection />
      <ImageGallery />
    </>
  );
};

export default Home;
