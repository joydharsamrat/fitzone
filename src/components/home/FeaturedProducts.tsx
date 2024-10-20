import { TProduct } from "../../interface";
import { useGetFeaturedProductsQuery } from "../../redux/features/product/product.api";
import ProductCard from "../product/productCard";
import styles from "../../styles/product.module.css";

const FeaturedProducts = () => {
  const { data } = useGetFeaturedProductsQuery(undefined);

  return (
    <div className="px-5 sm:px-10 max-w-7xl mx-auto">
      <h2 className="text-3xl w-fit font-semibold mb-10 uppercase section-title">
        Featured Products
      </h2>
      <div className={`${styles.productsContainer}`}>
        {data?.data?.map((product: TProduct) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
