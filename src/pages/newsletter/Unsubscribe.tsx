/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router-dom";
import { useUnsubscribeMutation } from "../../redux/features/newsletter/newsletter.api";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [unsubscribe, { isError, isSuccess, isLoading }] =
    useUnsubscribeMutation();

  const handleUnsubscribe = async () => {
    if (!token) return; // Handle missing token case
    try {
      await unsubscribe(token).unwrap(); // Ensure proper handling of promises
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="unsubscribe-page flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        {isLoading ? (
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mx-auto mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="text-lg font-semibold text-gray-700">
              Processing your request...
            </p>
          </div>
        ) : isSuccess ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600 mb-4">
              Unsubscribed Successfully!
            </h1>
            <p className="text-gray-600">
              You’ve been successfully removed from our newsletter. We’re sorry
              to see you go!
            </p>
          </div>
        ) : isError ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Error Unsubscribing
            </h1>
            <p className="text-gray-600">
              We couldn’t process your request. Please try again later.
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Unsubscribe
            </h1>
            <p className="text-gray-600 mb-6">
              Are you sure you want to unsubscribe from our newsletter? You
              won’t receive any further updates or offers from us.
            </p>
            <button
              onClick={handleUnsubscribe}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 focus:outline-none transition duration-300"
            >
              Confirm Unsubscribe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
