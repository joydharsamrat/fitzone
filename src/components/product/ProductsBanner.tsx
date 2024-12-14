import styles from "../../styles/product.module.css";

const ProductsBanner = () => {
  return (
    <div className={`${styles.banner} py-32 text-white text-center`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">
          Discover Our Premium Products
        </h1>
        <p className="text-lg mb-6">
          Quality, affordability, and style all in one place.
        </p>
      </div>
    </div>
  );
};

export default ProductsBanner;
