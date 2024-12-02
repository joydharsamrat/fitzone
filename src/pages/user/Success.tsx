import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center animate__animated animate__fadeInUp animate__delay-1s">
        <h1 className="text-3xl font-bold text-green-600 mb-4 animate__animated animate__zoomIn animate__delay-1s">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-6 animate__animated animate__fadeIn animate__delay-2s">
          Thank you for your purchase! Your order has been successfully placed.
        </p>
        <p className="flex justify-center items-center text-9xl text-green-600 mt-5 mb-12 animate__animated animate__fadeIn animate__delay-2s">
          <SiTicktick />{" "}
        </p>
        <div className="flex justify-around space-x-4">
          <button
            onClick={() => handleNavigation("/")}
            className="py-2 px-4 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-900 transition animate__animated animate__fadeIn animate__delay-2s"
          >
            Go to Home
          </button>

          <button
            onClick={() => handleNavigation("/user/orders")}
            className="py-1 px-2 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-900 transition animate__animated animate__fadeIn animate__delay-3s"
          >
            View My Orders
          </button>

          <button
            onClick={() => handleNavigation("/shop")}
            className="py-2 px-4 bg-primary-700 text-white text-sm rounded-lg hover:bg-primary-900 transition animate__animated animate__fadeIn animate__delay-4s"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
