import { TProduct } from "../../interface";
import { useGetFeaturedProductsQuery } from "../../redux/features/product/product.api";
import ProductCard from "../product/productCard";
import styles from "../../styles/product.module.css";
import ProductCardSkeleton from "../shared/loaders/ProductCardSkeleton";

const FeaturedProducts = () => {
  const { isLoading, data } = useGetFeaturedProductsQuery(undefined);

  return (
    <div className="mt-20 px-5 sm:px-10 max-w-7xl mx-auto">
      <h2 className="section-title">Featured Products</h2>
      <div className={`${styles.productsContainer}`}>
        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          data?.data?.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProducts;
