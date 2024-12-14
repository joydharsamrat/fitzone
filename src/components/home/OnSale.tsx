import { useGetAllProductsQuery } from "../../redux/features/product/product.api";
import ProductCardSkeleton from "../shared/loaders/ProductCardSkeleton";
import { TProduct } from "../../interface";
import ProductCard from "../product/productCard";
import styles from "../../styles/product.module.css";

const OnSale = () => {
  const { isLoading, data } = useGetAllProductsQuery({ onSale: true });

  return (
    <div className="mt-20 px-5 sm:px-10 max-w-7xl mx-auto">
      <h2 className="section-title">On Sale</h2>
      <div
        className={`${styles.productsContainer} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}
      >
        {isLoading ? (
          <ProductCardSkeleton count={8} />
        ) : data?.data.length ? (
          data?.data.map((product: TProduct) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="flex justify-center items-center text-3xl font-semibold">
            <p>No Products Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnSale;
