const CategorySkeleton = () => {
  return (
    <>
      {" "}
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="min-w-[100px]  flex cursor-pointer uppercase "
        >
          <div className="relative w-full bg-neutral-200 rounded text-center font-semibold transition-all duration-[.5s] p-4 animate-pulse">
            <div className="h-20 w-full bg-gray-300 mb-2 rounded" />

            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
          </div>
        </div>
      ))}
    </>
  );
};

export default CategorySkeleton;
