import { Link } from "react-router-dom";
import styles from "../styles/notfound.module.css";

const NotFound = () => {
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center  text-white ${styles.container}`}
    >
      <h1 className="text-6xl font-bold mb-4 text-secondary-700">404</h1>
      <p className="text-2xl mb-6">Oops! Page not found.</p>
      <p className="text-lg mb-8 text-gray-300 text-center px-4">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back on track.
      </p>
      <Link to="/" className="btn-primary ">
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
