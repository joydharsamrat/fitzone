import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import {
  FaChevronDown,
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaNewspaper,
  FaBox,
  FaClipboardList,
  FaShoppingCart,
  FaTools,
} from "react-icons/fa";
import ScrollToTopButton from "../shared/ScrollToTopButton";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import {
  getCurrentUser,
  getToken,
  logout,
} from "../../redux/features/auth/authSlice";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { logoutUser } from "../../utils/LogoutUser";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const token = useAppSelector(getToken);
  const user = useAppSelector(getCurrentUser);
  const [clearRefreshToken] = useLogoutMutation();

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
                <li>
                  <NavLink
                    to="/admin/dashboard"
                    className="flex items-center gap-2 w-full text-left p-2  text-white text-xs"
                  ></NavLink>
                  <button
                    onClick={() => setIsDashboardOpen(!isDashboardOpen)}
                    className=" w-full text-left p-2  text-white flex items-center gap-2 text-xs"
                  >
                    <FaTachometerAlt size={18} /> Dashboard
                    <span
                      style={{
                        transform: isDashboardOpen
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
                      isDashboardOpen ? "open" : ""
                    }`}
                  >
                    <div className="overflow-hidden">
                      <NavLink
                        onClick={toggleSidebar}
                        to="/admin/dashboard"
                        className="flex items-center gap-2 w-full text-left p-2  text-white text-xs"
                      >
                        <FaTools size={16} /> Admin Dashboard
                      </NavLink>
                    </div>
                  </div>
                </li>

                <li>
                  <button
                    onClick={() => setIsProductOpen(!isProductOpen)}
                    className=" w-full text-left p-2  text-white flex items-center gap-2 text-xs"
                  >
                    <FaBoxOpen size={18} /> Product management{" "}
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
                        onClick={toggleSidebar}
                        to="/admin/dashboard/product-management/products"
                        className="flex items-center gap-2 w-full text-left p-2  text-white text-xs"
                      >
                        <FaBox size={16} /> Products
                      </NavLink>
                      <NavLink
                        onClick={toggleSidebar}
                        to="/admin/dashboard/product-management/add-product"
                        className="flex items-center gap-2 w-full text-left p-2  text-white text-xs"
                      >
                        <FaClipboardList size={16} /> Add Product
                      </NavLink>
                    </div>
                  </div>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/order-management"
                    className="flex items-center gap-2  w-full text-left p-2 text-white text-xs"
                  >
                    <FaShoppingCart size={18} /> Order Management
                  </NavLink>
                </li>
                <li onClick={toggleSidebar}>
                  <NavLink
                    to="/admin/dashboard/user-management"
                    className="flex items-center gap-2  w-full text-left p-2 text-white text-xs"
                  >
                    <FaUsers size={18} /> User Management
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => setIsNewsletterOpen(!isNewsletterOpen)}
                    className=" w-full text-left p-2  text-xs text-white flex items-center gap-2"
                  >
                    <FaNewspaper size={18} /> Newsletter management{" "}
                    <span
                      style={{
                        transform: isNewsletterOpen
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
                      isNewsletterOpen ? "open" : ""
                    }`}
                  >
                    <div className="overflow-hidden">
                      <NavLink
                        onClick={toggleSidebar}
                        to="/admin/dashboard/newsletter-management/subscribers"
                        className="flex items-center gap-2 w-full text-left p-2 text-xs text-white"
                      >
                        <FaUsers size={16} /> Subscribers
                      </NavLink>
                    </div>
                  </div>
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
            <div className="hidden md:flex justify-end items-center w-full max-w-7xl px-5">
              {token && user?.role === "admin" && (
                <button
                  onClick={() =>
                    logoutUser(dispatch, logout, clearRefreshToken)
                  }
                  className="text-xs md:text-xs text-white px-2 md:px-4 py-1 md:py-2 bg-red-500 hover:bg-red-700 rounded-md"
                >
                  Logout
                </button>
              )}
            </div>

            <div className="flex md:hidden items-center gap-5">
              {token && user?.role === "admin" && (
                <button
                  onClick={() =>
                    logoutUser(dispatch, logout, clearRefreshToken)
                  }
                  className=" text-xs md:text-xs text-white px-2 md:px-4 py-1 md:py-2 bg-red-500 hover:bg-red-700 rounded-md"
                >
                  Logout
                </button>
              )}
              {/* Burger Icon */}
              <button
                className=" text-white focus:outline-none"
                onClick={toggleSidebar}
              >
                {isSidebarOpen ? (
                  <AiOutlineClose size={24} />
                ) : (
                  <AiOutlineMenu size={24} />
                )}
              </button>
            </div>
          </header>
          <div className="max-w-7xl mx-auto p-5">
            <Outlet />
          </div>
        </main>
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default AdminLayout;
