const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between w-full mb-5 relative overflow-hidden rounded-lg p-1 box-border bg-neutral-200 animate-pulse h-full">
      <div className="w-full aspect-square relative overflow-hidden rounded-t-md">
        <div className="w-full h-full bg-gray-300"></div>{" "}
      </div>

      <div className="mt-2">
        <div className="h-4 bg-gray-300 mb-1"></div>{" "}
        <div className="h-3 bg-gray-300 mb-1"></div>{" "}
      </div>

      <div className="mt-5">
        <hr className="border " />
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 bg-gray-300 w-1/4"></div>{" "}
          <div className="h-8 w-1/4 bg-gray-300 rounded-md"></div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
