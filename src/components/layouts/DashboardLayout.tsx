import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Icons for burger and close menu
import { FaArrowRight, FaChevronDown } from "react-icons/fa";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isProductOpen, setIsProductOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col md:flex-row items-stretch  w-full mx-auto relative ">
        {/* Sidebar */}
        <div>
          <NavLink
            to="/"
            className="hidden md:flex flex-shrink-0 items-center py-3 bg-primary-700 px-5"
          >
            <img
              src="/logo.ico"
              className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
              alt="Logo"
            />
            <h1 className="logo sm:text-3xl">FITZONE</h1>
          </NavLink>
          <nav
            className={`absolute h-screen md:static md:h-full bg-primary-700 top-0 bottom-0  left-0 z-40 w-64  transform transition-transform duration-300 md:translate-x-0  ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-4 md:h-full">
              <ul className="space-y-4">
                <NavLink
                  to="/"
                  className="flex md:hidden flex-shrink-0 items-center py-3 bg-primary-700"
                >
                  <img
                    src="/logo.ico"
                    className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                    alt="Logo"
                  />
                  <h1 className="logo sm:text-3xl">FITZONE</h1>
                </NavLink>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard"
                    className="block w-full text-left p-2  text-white"
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li onClick={toggleSidebar}>
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className=" w-full text-left p-2  text-white flex items-center gap-2"
                  >
                    Product management{" "}
                    <span
                      style={{
                        transform: isProductOpen
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <FaChevronDown />
                    </span>
                  </button>
                  <div
                    className={`ml-5 optionsContainer ${
                      isProductOpen ? "open" : ""
                    }`}
                  >
                    <div className="overflow-hidden">
                      <NavLink
                        to="/admin/dashboard/product-management"
                        className="flex items-center gap-2 w-full text-left p-2  text-white"
                      >
                        <span>
                          <FaArrowRight />
                        </span>{" "}
                        Products
                      </NavLink>
                      <NavLink
                        to="/admin/dashboard/product-management/add-product"
                        className="flex items-center gap-2 w-full text-left p-2  text-white"
                      >
                        <span>
                          <FaArrowRight />
                        </span>{" "}
                        Add Product
                      </NavLink>
                    </div>
                  </div>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/order-management"
                    className="block w-full text-left p-2 text-white"
                  >
                    Order Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/user-management"
                    className="block w-full text-left p-2 text-white "
                  >
                    User Management
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <main className="w-full mx-auto md:min-h-screen">
          <header className="p-4 bg-primary-700 text-white flex justify-between md:justify-center items-center">
            <NavLink
              to="/"
              className="flex flex-shrink-0 items-center py-2 bg-primary-700 md:hidden"
            >
              <img
                src="/logo.ico"
                className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                alt="Logo"
              />
              <h1 className="logo sm:text-3xl">FITZONE</h1>
            </NavLink>
            <h1 className="text-2xl font-bold hidden md:block">
              Admin Dashboard
            </h1>
            {/* Burger Icon */}
            <button
              className="md:hidden text-white focus:outline-none"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <AiOutlineClose size={24} />
              ) : (
                <AiOutlineMenu size={24} />
              )}
            </button>
          </header>
          <div className="max-w-7xl mx-auto p-5">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
