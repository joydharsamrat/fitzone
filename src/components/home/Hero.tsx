import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <div className={`bg-gradient `}>
      <div className=" grid sm:grid-cols-2 justify-between  mb-20 px-10  relative  max-w-7xl mx-auto ">
        <div className="flex flex-col justify-center gap-5 text-white animate__animated animate__fadeInLeft animate__slow animate__delay-.5s py-20 sm:py-0 z-10 min-h-[600px]">
          <h1 className=" w-fit text-3xl sm:text-5xl font-semibold">
            Unleash Your Potential
          </h1>
          <h3 className="text-xl sm:text-2xl">
            Transform Your Fitness Journey
          </h3>
          <p className="text-xs sm:text-sm">
            Premium Equipment. Expertly Crafted. Delivered to Your Door. Your
            ultimate source for high-performance fitness gear—designed to help
            you reach your goals, faster and smarter.
          </p>
          <NavLink to="/products" className="btn-primary">
            Shop Now
          </NavLink>
        </div>
        <div className=" flex items-end absolute bottom-0 sm:static ">
          <img
            className=" w-full "
            src="/assets/images/hero-img.png"
            alt="a man holding a dumbbell"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
