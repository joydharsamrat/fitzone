import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid sm:grid-cols-2  h-screen ">
      <div>
        <img className="w-full" src="/assets/images/404.webp" alt="404" />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-8xl font-bold text-secondary-700">404</h1>
        <h2 className="text-4xl font-bold">Page Not Found</h2>
        <p className="mt-4 text-sm sm:text-base">
          Sorry, the page you are looking for does not exist.
        </p>
        <NavLink className="underline text-blue-600" to="/">
          home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
