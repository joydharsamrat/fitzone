import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/product/productCard";
import { TProduct, TCategory } from "../../interface";
import { useGetAllProductsQuery } from "../../redux/features/product/product.api";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import CategorySelect from "../../components/product/selectProductCategory";
import PriceRangeSelector from "../../components/product/pricerangeSelector";
import ProductCardSkeleton from "../../components/shared/loaders/ProductCardSkeleton";
import ProductsBanner from "../../components/product/ProductsBanner";
import styles from "../../styles/product.module.css";
import { scrollToTop } from "../../utils/ScrollToTop";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category"); // Get category from URL query params

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories for filters
  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(undefined);

  // Preselect category based on URL query parameter
  useEffect(() => {
    if (categoryParam && categoryData) {
      const matchingCategory = categoryData.data.find(
        (category: TCategory) => category._id === categoryParam
      );
      if (matchingCategory) {
        setSelectedCategories([matchingCategory]);
      }
    }
    setPage(1); // Reset pagination on category change
  }, [categoryParam, categoryData]);

  const query = {
    searchTerm: debouncedSearchTerm,
    categories: selectedCategories.map((cat) => cat._id),
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  };

  const { data, isLoading, refetch } = useGetAllProductsQuery(query);

  // Debounce logic for search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Reset filters function
  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(100000);
    setSort("desc");
    setPage(1);
    refetch();
  };

  // Pagination controls
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Toggle filter visibility on small screens
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  useEffect(() => {
    scrollToTop();
  }, [data]);

  return (
    <div>
      <ProductsBanner />

      <div className="max-w-7xl mx-auto py-10 sm:py-20 px-5">
        {/* Filters Toggle Button for Small Screens */}
        <div className="px-2 flex justify-end md:hidden mb-5 md:mb-0">
          <button className="btn-primary" onClick={toggleFilters}>
            {showFilters ? "X" : "Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar for Filters */}
          <div
            className={`grid grid-rows-[0fr] md:grid-rows-[1fr] transition-all duration-500 ease-in-out col-span-1 bg-white p-4 rounded-lg md:shadow ${
              showFilters && "grid-rows-[1fr]"
            } md:col-span-1`}
          >
            <div className="min-h-0 overflow-hidden">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              {/* Search Bar */}
              <form className="flex justify-between items-stretch mb-4 border border-gray-300 rounded-md">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full p-1"
                />
              </form>

              {/* Category Filter */}
              {isCategoryLoading ? (
                <div className="animate-pulse bg-gray-200 h-10 rounded mb-4" />
              ) : (
                <CategorySelect
                  categories={categoryData?.data || []}
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                />
              )}

              {/* Price Range Selector */}
              <PriceRangeSelector
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
              />

              {/* Sorting Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Sort by Price
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as "asc" | "desc")}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="asc">Price: Low to High</option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>

              {/* Clear Filters Button */}
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-4 w-full bg-gray-200 text-gray-700 font-semibold py-2 rounded-md"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className={`col-span-1 md:col-span-3`}>
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

            {/* Pagination Controls */}
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
        </div>
      </div>
    </div>
  );
};

export default Products;
