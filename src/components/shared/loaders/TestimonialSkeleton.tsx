const TestimonialSkeleton = () => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div>
          <div className="w-32 h-4 bg-gray-300 rounded mb-2"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-full h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-full h-6 bg-gray-300 rounded mb-2"></div>
      <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
    </div>
  );
};

export default TestimonialSkeleton;
