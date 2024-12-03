import { useGetAllProductsQuery } from "../../../redux/features/product/product.api";
import ProductCardSkeleton from "../../../components/shared/loaders/ProductCardSkeleton";
import { TCategory, TProduct } from "../../../interface";
import styles from "../../../styles/product.module.css";
import ProductCard from "../../../components/admin/productManagement/ProductCard";
import { useGetAllCategoriesQuery } from "../../../redux/features/category/categoryApi";
import { useEffect, useState } from "react";
import { scrollToTop } from "../../../utils/ScrollToTop";

const ProductManagement = () => {
  const { data: categories } = useGetAllCategoriesQuery(undefined);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const query = {
    searchTerm: debouncedSearchTerm,
    categories: [selectedCategory],
    sort,
    page,
    limit,
  };

  const { data, isLoading } = useGetAllProductsQuery(query);

  // Pagination controls
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    scrollToTop();
  }, [data]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary-700 text-center mb-8">
        Product Management
      </h1>
      <div className="flex flex-col lg:flex-row items-center justify-center mb-6 gap-4 bg-gradient py-5 px-5 rounded-lg md:rounded-3xl md:px-8">
        {/* Search Input */}
        <div className="w-full lg:w-1/2">
          <div className="flex">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="w-full lg:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full lg:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">All Categories</option>
            {categories?.data?.map((category: TCategory) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="w-full lg:w-auto">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "desc" | "asc")}
            className="w-full lg:w-auto p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option disabled>Sort By Price</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

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
      <div className="flex justify-center items-center mt-6 gap-10">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mx-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-lg font-semibold">{page}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={data?.data?.length < limit}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mx-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductManagement;
