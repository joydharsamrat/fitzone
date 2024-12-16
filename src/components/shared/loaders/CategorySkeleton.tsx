const CategorySkeleton = () => {
  return (
    <div className="flex items-center gap-5">
      {" "}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex  uppercase min-w-28">
          <div className="relative w-full bg-neutral-200 rounded text-center font-semibold transition-all duration-[.5s] p-4 animate-pulse">
            <div className="h-20 w-full bg-gray-300 mb-2 rounded" />

            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
