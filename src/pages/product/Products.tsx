import { useState, useEffect } from "react";
import ProductCard from "../../components/product/productCard";
import { TProduct, TCategory } from "../../interface";
import { useGetAllProductsQuery } from "../../redux/features/product/product.api";
import styles from "../../styles/product.module.css";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import CategorySelect from "../../components/product/selectProductCategory";
import PriceRangeSelector from "../../components/product/pricerangeSelector";
import ProductCardSkeleton from "../../components/shared/loaders/ProductCardSkeleton";
import ProductsBanner from "../../components/product/ProductsBanner";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<TCategory[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000);
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const limit = 8;
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedCategories([]);
    setMinPrice(0);
    setMaxPrice(10000);
    setSort("desc");
    setPage(1);
    refetch();
  };

  const { data: categoryData, isLoading: isCategoryLoading } =
    useGetAllCategoriesQuery(undefined);

  const query = {
    searchTerm,
    categories: selectedCategories.map((cat) => cat._id),
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  };

  const { data, isLoading, refetch } = useGetAllProductsQuery(query);

  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchTerm(e.currentTarget.searchTerm.value);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [selectedCategories, minPrice, maxPrice, sort, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  return (
    <div>
      <ProductsBanner />

      <div className="max-w-7xl mx-auto py-10 sm:py-20 px-5">
        {/* Toggle button for filters on small screens */}
        <div className="px-2 flex justify-end md:hidden mb-5 md:mb-0">
          <button className="btn-primary" onClick={toggleFilters}>
            {showFilters ? "X" : "Filters"}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div
            className={`grid grid-rows-[0fr] md:grid-rows-[1fr] transition-all duration-500 ease-in-out col-span-1 bg-white p-4 rounded-lg md:shadow  ${
              showFilters && "grid-rows-[1fr]"
            } md:col-span-1 `}
          >
            <div className="min-h-0 overflow-hidden">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>

              {/* Search */}
              <form
                onSubmit={searchProducts}
                className="flex justify-between items-stretch mb-4 border border-gray-300 rounded-md "
              >
                <input
                  type="text"
                  name="searchTerm"
                  placeholder="Search products..."
                  className="w-full p-1"
                />
                <button
                  type="submit"
                  className="bg-secondary-700 rounded-e p-2 text-white"
                >
                  search
                </button>
              </form>

              {/* Category Filter */}
              {isCategoryLoading ? (
                <>
                  <label className="block text-sm font-medium mb-2">
                    Categories
                  </label>
                  <div>
                    <button
                      type="button"
                      className="w-full p-2 border border-gray-300 rounded animate-pulse bg-gray-300 flex justify-between items-center"
                    >
                      <span className="bg-gray-200 h-4 w-3/4 rounded" />
                      <div className="w-5 h-5 bg-gray-200 rounded-full" />
                    </button>
                  </div>{" "}
                </>
              ) : (
                <CategorySelect
                  categories={categoryData?.data || []}
                  selectedCategories={selectedCategories}
                  onChange={setSelectedCategories}
                />
              )}

              {/* Price Range */}
              <PriceRangeSelector
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinPriceChange={setMinPrice}
                onMaxPriceChange={setMaxPrice}
              />

              {/* Sorting */}
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
                data?.data?.map((product: TProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div className="flex justify-center items-center text-3xl font-semibold">
                  <p>No Product Found</p>
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
              <span className="text-lg font-semibold ">{page}</span>
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
