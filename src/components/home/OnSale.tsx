/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductsQuery } from "../../redux/features/product/product.api";
import ProductCardSkeleton from "../shared/loaders/ProductCardSkeleton";
import { TProduct } from "../../interface";
import ProductCard from "../product/productCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef, useState } from "react";
import { Navigation } from "swiper/modules";

const OnSale = () => {
  const { isLoading, data } = useGetAllProductsQuery({ onSale: true });

  const swiperRef = useRef<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const updateNavigationState = (swiper: any) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className="mt-20 px-5 sm:px-10 max-w-7xl mx-auto">
      <h2 className="section-title">On Sale</h2>
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
            640: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 30 },
          }}
          modules={[Navigation]}
          navigation={false}
          className="w-full "
          style={{ padding: "20px 0" }}
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SwiperSlide key={index} style={{ height: "auto" }}>
                  <ProductCardSkeleton />
                </SwiperSlide>
              ))
            : data?.data.map((product: TProduct) => (
                <SwiperSlide key={product._id} style={{ height: "auto" }}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <div className="flex gap-2 text-white">
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
    </div>
  );
};

export default OnSale;
