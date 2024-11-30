import { TCategory, TProduct } from "../../interface";
import { useGetAllProductsQuery } from "../../redux/features/product/product.api";
import ProductCardSkeleton from "../shared/loaders/ProductCardSkeleton";
import ProductCard from "./productCard";
import styles from "../../styles/product.module.css";

const SimilarProducts = ({
  category,
  id,
}: {
  category: TCategory;
  id: string;
}) => {
  const { data, isLoading } = useGetAllProductsQuery({
    categories: [category?._id],
  });

  const products: TProduct[] = data?.data?.filter(
    (product: TProduct) => product._id !== id
  );

  console.log(products);
  return (
    <div className="px-5 sm:px-10 max-w-7xl mx-auto my-12">
      <h2 className="text-3xl font-bold text-primary-700  mb-8">
        Similar Products
      </h2>
      <div className={`${styles.productsContainer}`}>
        {isLoading ? (
          <ProductCardSkeleton />
        ) : (
          products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
