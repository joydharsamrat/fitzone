import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { TCategory } from "../../interface";
import { useNavigate } from "react-router-dom";
import CategorySkeleton from "../shared/loaders/CategorySkeleton";

const ProductCategories = () => {
  const { isLoading, data } = useGetAllCategoriesQuery(undefined);
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="mt-20 px-5 sm:px-10 pb-10 max-w-7xl mx-auto">
      <h2 className="section-title">Product Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 items-stretch justify-items-center gap-5 sm:gap-20">
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          data?.data?.map((category: TCategory) => (
            <div
              className="min-w-[100px] flex cursor-pointer uppercase hover:shadow-xl hover:-translate-y-2 transition-all duration-200 group"
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
            >
              <div className="relative bg-neutral-200 rounded text-center font-semibold box-shadow transition-all duration-[.5s] p-4 flex flex-col justify-between">
                <p className="w-4 hidden group-hover:block absolute top-2 right-2 text-secondary-500 animate__animated animate__fadeInLeft">
                  <ArrowRightIcon />
                </p>
                <img
                  className="w-full mb-2 group-hover:scale-105 transition-all duration-[.5s]"
                  src={category.icon}
                  alt={category.title}
                />
                <p className="text-xs">{category.title}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCategories;
