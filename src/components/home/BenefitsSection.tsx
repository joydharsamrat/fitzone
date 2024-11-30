const BenefitsSection = () => {
  return (
    <div className="mt-20 bg-background-100 ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary-700 text-center mb-8">
          Why Choose Our Products?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Benefit 1: High Quality */}
          <div className="flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-20 w-20">
              <img
                src="/assets/images/features/Quality.jpeg"
                alt="High Quality"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-semibold text-primary-700 mb-1">
                High Quality
              </h3>
              <p className="text-neutral-700 text-xs">
                Premium materials for lasting quality.
              </p>
            </div>
          </div>

          {/* Benefit 2: Affordable Pricing */}
          <div className="flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-20 w-20">
              <img
                src="/assets/images/features/price.jpeg"
                alt="Affordable Pricing"
                className="h-full w-full object-cover rounded-s"
              />
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-semibold text-primary-700 mb-1">
                Affordable Pricing
              </h3>
              <p className="text-neutral-700 text-xs">
                Competitive prices for every budget.
              </p>
            </div>
          </div>

          {/* Benefit 3: Eco-Friendly */}
          <div className="flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-20 w-20">
              <img
                src="/assets/images/features/Eco.jpeg"
                alt="Eco-Friendly"
                className="h-full w-full object-cover rounded-s"
              />
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-semibold text-primary-700 mb-1">
                Eco-Friendly
              </h3>
              <p className="text-neutral-700 text-xs">
                Environmentally friendly materials.
              </p>
            </div>
          </div>

          {/* Benefit 4: Expert Support */}
          <div className="flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-20 w-20">
              <img
                src="/assets/images/features/customer.jpeg"
                alt="Expert Support"
                className="h-full w-full object-cover rounded-s"
              />
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-semibold text-primary-700 mb-1">
                Expert Support
              </h3>
              <p className="text-neutral-700 text-xs">
                24/7 assistance for all your needs.
              </p>
            </div>
          </div>

          {/* Benefit 5: Durability */}
          <div className="flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-20 w-20">
              <img
                src="/assets/images/features/durable.jpeg"
                alt="Durability"
                className="h-full w-full object-cover rounded-s"
              />
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-semibold text-primary-700 mb-1">
                Durability
              </h3>
              <p className="text-neutral-700 text-xs">
                Built to last in any conditions.
              </p>
            </div>
          </div>

          {/* Benefit 6: Wide Range of Options */}
          <div className="flex items-center bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="h-20 w-20">
              <img
                src="/assets/images/features/options.jpeg"
                alt="Wide Range of Options"
                className="h-full w-full object-cover rounded-s"
              />
            </div>
            <div className="flex-1 p-2">
              <h3 className="font-semibold text-primary-700 mb-1">
                Wide Range of Options
              </h3>
              <p className="text-neutral-700 text-xs">
                Choose from a variety of styles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
