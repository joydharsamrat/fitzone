import { useGetAllProductsQuery } from "../../../redux/features/product/product.api";
import ProductCardSkeleton from "../../../components/shared/loaders/ProductCardSkeleton";
import { TProduct } from "../../../interface";
import ProductCard from "../../../components/product/productCard";
import styles from "../../../styles/product.module.css";

const ProductManagement = () => {
  const { data, isLoading } = useGetAllProductsQuery({});

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-700 text-center mb-8">
        Product Management
      </h1>
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

export default ProductManagement;
