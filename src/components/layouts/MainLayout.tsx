import { useEffect, useState } from "react"; // Import useEffect and useState
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import ScrollToTopButton from "../shared/ScrollToTopButton";

const MainLayout = () => {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false); // State to manage sticky navbar

  const navigation = [
    { name: "Home", href: "/home", current: location.pathname === "/home" },
    {
      name: "Products",
      href: "/products",
      current: location.pathname === "/products",
    },
    {
      name: "Dashboard",
      href: "/dashboard",
      current: location.pathname === "/dashboard",
    },
    {
      name: "Contact",
      href: "/contact",
      current: location.pathname === "/contact",
    },
    { name: "About", href: "/about", current: location.pathname === "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function classNames(...classes: [...string[]]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      <Disclosure
        as="nav"
        className={`w-full bg-primary-700 ${
          isSticky
            ? "fixed top-0 z-50 animate__animated  animate__fadeInDown"
            : "relative"
        }`}
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-neutral-200 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
              <NavLink to="/" className="flex flex-shrink-0 items-center ">
                <img
                  src="/logo.ico"
                  className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                  alt="Logo"
                />
                <h1 className="logo sm:text-3xl">FITZONE</h1>
              </NavLink>
              <div className="hidden sm:ml-6 sm:flex ">
                <div className="flex items-center space-x-4 ">
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-secondary-900 text-white"
                          : "text-gray-300 hover:bg-secondary-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <NavLink
                  to="/cart"
                  className="relative rounded-full bg-secondary-700 p-2 text-white hover:text-white hover:bg-secondary-900  focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-secondary-700 "
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View Cart Items</span>
                  <span className="absolute top-0 right-0 flex justify-center items-center text-[10px] font-bold border bg-secondary-700 h-4 w-4 rounded-full text-white">
                    0
                  </span>
                  <ShoppingCartIcon aria-hidden="true" className="h-6 w-6" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as={NavLink}
                to={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-primary-900 text-white"
                    : "text-gray-300 hover:bg-primary-500 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <Outlet />

      <footer className="bg-primary-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {/* Company Info */}
          <div>
            <NavLink to="/" className="flex  items-center mb-4">
              <img
                src="/logo.ico"
                className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                alt="Logo"
              />
              <h1 className="logo sm:text-3xl">FITZONE</h1>
            </NavLink>
            <p className="text-neutral-300 text-sm">
              We provide high-quality products that enhance your well-being. Our
              mission is to bring you the best experience with top-notch
              service.
            </p>
            <p className="mt-4 text-neutral-400 text-xs">
              &copy; 2024 Fitzone. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaFacebook />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-neutral-300 hover:text-secondary-500 transition-colors"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Subscribe to our Newsletter
            </h3>
            <p className="text-neutral-300 text-sm mb-4">
              Get the latest updates and offers directly in your inbox.
            </p>
            <form className="flex flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-2 py-2 rounded-l-lg  bg-neutral-100 text-primary-900 outline-none flex-1"
              />
              <button
                type="submit"
                className="px-2 py-2   bg-secondary-700 text-white rounded-r-lg hover:bg-secondary-900 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>

      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;
