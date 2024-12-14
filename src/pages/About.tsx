import {
  FaDumbbell,
  FaHeartbeat,
  FaRunning,
  FaStar,
  FaTrophy,
} from "react-icons/fa";
import styles from "../styles/about.module.css";

const imgs = [
  "/assets/images/partners/Adidas-Logo.png",
  "/assets/images/partners/life-fitness-logo.webp",
  "/assets/images/partners/Nike-Logo.png",
  "/assets/images/partners/Peloton-Cycle-Logo.png",
  "/assets/images/partners/Reebok-Logo.png",
  "/assets/images/partners/Under-Armour-Logo.png",
];

const About = () => {
  return (
    <div>
      <div>
        <div className={`${styles.banner} py-32 text-white text-center`}>
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Welcome to FitZone, where quality meets passion.Discover who we are
            and what drives us to serve you better.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="space-y-10">
          {/* Section 1: Mission */}
          <section className="flex flex-col justify-center items-center animate__animated animate__fadeIn">
            <h2 className="section-title ">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed md:w-1/2 mx-auto text-center">
              We aim to empower individuals on their fitness journeys by
              providing top-quality fitness equipment. Our mission is to make
              fitness accessible, affordable, and enjoyable for everyone.
            </p>
          </section>

          {/* Section 2: Features */}
          <section className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white box-shadow rounded-lg animate__animated animate__fadeIn">
              <FaDumbbell className="text-4xl text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Quality Equipment
              </h3>
              <p className="text-gray-600">
                Our products are crafted with the highest standards to ensure
                durability and performance.
              </p>
            </div>
            <div className="p-6 bg-white box-shadow rounded-lg animate__animated animate__fadeIn">
              <FaHeartbeat className="text-4xl text-red-500 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Customer Focused
              </h3>
              <p className="text-gray-600">
                We prioritize your fitness goals, offering guidance and support
                every step of the way.
              </p>
            </div>
            <div className="p-6 bg-white box-shadow rounded-lg animate__animated animate__fadeIn">
              <FaStar className="text-4xl text-yellow-500 mb-4 mx-auto" />
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                Trusted by Athletes
              </h3>
              <p className="text-gray-600">
                Our equipment is trusted by fitness enthusiasts and
                professionals worldwide.
              </p>
            </div>
          </section>
          <div className=" py-12">
            <div className="space-y-10">
              {/* Section 1: Overview */}
              <section className="flex flex-col justify-center items-center  animate__animated animate__fadeIn">
                <h2 className="section-title">
                  Our Commitment to Your Success
                </h2>
                <p className="text-gray-600 leading-relaxed md:w-1/2 mx-auto text-center">
                  Our journey is built around providing you with the tools,
                  support, and motivation you need to achieve your fitness
                  goals. From high-quality equipment to expert advice, we are
                  committed to empowering you every step of the way.
                </p>
              </section>

              {/* Section 2: The Milestones */}
              <section className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-white box-shadow rounded-lg animate__animated animate__fadeIn">
                  <FaDumbbell className="text-4xl text-blue-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    Start Strong
                  </h3>
                  <p className="text-gray-600 ">
                    Begin your fitness journey with top-tier equipment designed
                    to meet all your fitness needs, from strength training to
                    cardio.
                  </p>
                </div>
                <div className="p-6 bg-white box-shadow rounded-lg animate__animated animate__fadeIn">
                  <FaRunning className="text-4xl text-red-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    Stay Consistent
                  </h3>
                  <p className="text-gray-600">
                    Build a sustainable routine with a wide variety of gear that
                    suits all fitness levels, helping you stay on track and
                    motivated.
                  </p>
                </div>
                <div className="p-6 bg-white box-shadow rounded-lg animate__animated animate__fadeIn">
                  <FaTrophy className="text-4xl text-yellow-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-medium text-gray-800 mb-2">
                    Achieve Your Goals
                  </h3>
                  <p className="text-gray-600">
                    Push your limits and celebrate your achievements with
                    professional equipment that supports your progress and
                    celebrates your success.
                  </p>
                </div>
              </section>
            </div>
          </div>

          <section className="py-12 ">
            <div className="flex justify-center">
              <h2 className="section-title">Our Trusted Partners</h2>
            </div>
            <div className="flex items-center gap-20 pointer-events-none overflow-hidden mt-10">
              <div className={`flex gap-20 items-center ${styles.partners}`}>
                {imgs?.map((img, i) => (
                  <img
                    key={i}
                    className={`${"max-h-full max-w-[150px]"} `}
                    src={img}
                    alt="#"
                  />
                ))}
              </div>
              <div className={`flex gap-20 items-center  ${styles.partners}`}>
                {imgs?.map((img, i) => (
                  <img
                    key={i}
                    className={`${"max-h-full max-w-[150px]"} `}
                    src={img}
                    alt="#"
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
