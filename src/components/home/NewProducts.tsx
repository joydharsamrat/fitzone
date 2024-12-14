import { TProduct } from "../../interface";
import { useGetAllProductsQuery } from "../../redux/features/product/product.api";
import styles from "../../styles/product.module.css";
import ProductCard from "../product/productCard";
import ProductCardSkeleton from "../shared/loaders/ProductCardSkeleton";

const NewProducts = () => {
  const { isLoading, data } = useGetAllProductsQuery({ newProducts: true });
  const { isLoading: fallbackLoading, data: generalProductsData } =
    useGetAllProductsQuery({}, { skip: isLoading || data?.data?.length });

  if (
    isLoading ||
    fallbackLoading ||
    (!data?.data?.length && !generalProductsData?.data?.length)
  ) {
    return null;
  }

  return (
    <div className="mt-20 px-5 sm:px-10 max-w-7xl mx-auto">
      <h2 className="section-title">Latest Products</h2>
      <div
        className={`${styles.productsContainer} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
      >
        {isLoading || fallbackLoading ? (
          <ProductCardSkeleton count={8} />
        ) : data?.data.length ? (
          data?.data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          generalProductsData?.data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default NewProducts;
