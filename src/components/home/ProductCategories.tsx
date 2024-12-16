/* eslint-disable @typescript-eslint/no-explicit-any */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper/modules";
import { useGetAllCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import CategorySkeleton from "../shared/loaders/CategorySkeleton";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { TCategory } from "../../interface";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const ProductCategories = () => {
  const { isLoading, data } = useGetAllCategoriesQuery(undefined);
  const navigate = useNavigate();

  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  const updateNavigationState = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="mt-20 px-5 sm:px-10  max-w-7xl mx-auto ">
      <h2 className="section-title">Product Categories</h2>
      {isLoading ? (
        <CategorySkeleton />
      ) : (
        <>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              updateNavigationState(swiper);
            }}
            onSlideChange={(swiper) => updateNavigationState(swiper)}
            slidesPerView={2}
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 5, spaceBetween: 20 },
              1024: { slidesPerView: 8, spaceBetween: 30 },
            }}
            modules={[Navigation]}
            navigation={false}
            className="w-full bg-neutral-100 mb-5 rounded-md"
            style={{ padding: "20px 10px" }}
          >
            {data?.data?.map((category: TCategory) => (
              <SwiperSlide style={{ height: "auto" }} key={category._id}>
                <div
                  className="h-full flex cursor-pointer uppercase hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group"
                  onClick={() => handleCategoryClick(category._id)}
                >
                  <div className="relative bg-white rounded text-center font-semibold box-shadow transition-all duration-[.5s] p-4 flex flex-col justify-between">
                    <p className="w-4 hidden group-hover:block absolute top-2 right-2 text-secondary-500 animate__animated animate__fadeInLeft">
                      <ArrowRightIcon />
                    </p>
                    <img
                      className="w-full mb-2 group-hover:scale-105 transition-all duration-[.5s]"
                      src={category.icon}
                      alt={category.title}
                    />
                    <p className="text-xs group-hover:text-secondary-700">
                      {category.title}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <div className=" flex gap-2 text-white">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`px-2 py-1 text-sm rounded transition ${
                isBeginning
                  ? "bg-secondary-300 cursor-default"
                  : "bg-secondary-700 hover:bg-secondary-900"
              }`}
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`px-2 py-1 text-sm rounded transition ${
                isEnd
                  ? "bg-secondary-300 cursor-default"
                  : "bg-secondary-700 hover:bg-secondary-900"
              }`}
            >
              <FaAngleRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCategories;
