import { TTestimonial } from "../../interface";
import { useGetAllTestimonialsQuery } from "../../redux/features/testimonials/testimonials.api";
import TestimonialSkeleton from "../shared/loaders/TestimonialSkeleton";

const Testimonials = () => {
  const { data, isLoading } = useGetAllTestimonialsQuery(undefined);

  const testimonials: TTestimonial[] = data?.data || [];

  return (
    <div className="mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="section-title">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <TestimonialSkeleton key={index} />
              ))
            : testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    "{testimonial.feedback}"
                  </p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
