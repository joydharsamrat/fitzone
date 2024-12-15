import { Fragment, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useGetItemsByUserQuery } from "../../redux/features/cart/cart.api";
import { TCartItem } from "../../interface";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import {
  getCurrentUser,
  getToken,
  logout,
} from "../../redux/features/auth/authSlice";
import { useLogoutMutation } from "../../redux/features/auth/authApi";
import { logoutUser } from "../../utils/LogoutUser";

const NavBar = () => {
  const token = useAppSelector(getToken);
  const user = useAppSelector(getCurrentUser);
  const dispatch = useAppDispatch();
  const [clearRefreshToken] = useLogoutMutation();

  const { data: cartData } = useGetItemsByUserQuery(undefined, {
    skip: !token || user?.role !== "user",
  });

  const cartItemCount = cartData?.data?.reduce(
    (sum: number, item: TCartItem) => sum + item.quantity,
    0
  );

  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);

  const navigation = [
    { name: "Home", href: "/home", current: location.pathname === "/home" },
    {
      name: "Products",
      href: "/products",
      current: location.pathname === "/products",
    },
    ...(token && user?.role === "admin"
      ? [
          {
            name: "Dashboard",
            href: "/admin/dashboard",
            current: location.pathname === "/admin/dashboard",
          },
        ]
      : []),
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

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure
      as="nav"
      className={`w-full bg-primary-700 ${
        isSticky
          ? "fixed top-0 z-50 animate__animated animate__fadeInDown"
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
            <NavLink to="/" className="flex flex-shrink-0 items-center">
              <img
                src="/logo.ico"
                className="h-7 w-7 sm:h-10 sm:w-10 mr-2"
                alt="Logo"
              />
              <h1 className="logo sm:text-3xl">FITZONE</h1>
            </NavLink>
            <div className="hidden sm:ml-6 sm:flex">
              <div className="flex items-center space-x-4">
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
              {token ? (
                <>
                  <button
                    onClick={() =>
                      logoutUser(dispatch, logout, clearRefreshToken)
                    }
                    className="hidden md:block text-sm text-white px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md"
                  >
                    Logout
                  </button>
                  {user?.role === "user" ? (
                    <>
                      {/* Profile Dropdown */}
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <MenuButton className="flex rounded-full bg-secondary-700 p-2 text-white hover:bg-secondary-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-secondary-700">
                            <span className="sr-only">Open user menu</span>
                            <UserCircleIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                          </MenuButton>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                            <MenuItem>
                              {() => (
                                <NavLink
                                  to="/user/profile"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                                >
                                  Profile
                                </NavLink>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {() => (
                                <NavLink
                                  to="/user/orders"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  Orders
                                </NavLink>
                              )}
                            </MenuItem>
                            <MenuItem>
                              {() => (
                                <NavLink
                                  to="/user/cart"
                                  className="relative flex items-center justify-center rounded-b-md bg-secondary-700 px-4 py-2 text-sm text-white hover:bg-secondary-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-secondary-700"
                                >
                                  <div className="relative">
                                    <ShoppingCartIcon
                                      aria-hidden="true"
                                      className="h-5 w-5 text-white"
                                    />
                                    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary-900 text-[10px] font-bold text-white">
                                      {cartItemCount}
                                    </span>
                                  </div>
                                  <span className="ml-4">Cart</span>
                                </NavLink>
                              )}
                            </MenuItem>
                          </MenuItems>
                        </Transition>
                      </Menu>
                    </>
                  ) : (
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <MenuButton className="flex rounded-full bg-secondary-700 p-2 text-white hover:bg-secondary-900 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-secondary-700">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                        </MenuButton>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          <MenuItem>
                            {() => (
                              <NavLink
                                to="/admin/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                              >
                                Profile
                              </NavLink>
                            )}
                          </MenuItem>
                        </MenuItems>
                      </Transition>
                    </Menu>
                  )}
                </>
              ) : (
                <NavLink
                  to="/login"
                  className="text-sm text-white px-4 py-2 border border-white bg-transparent hover:bg-white hover:text-primary-700 rounded-md transition duration-200"
                >
                  Login
                </NavLink>
              )}
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
          {token && (
            <DisclosureButton
              as="button"
              onClick={() => logoutUser(dispatch, logout, clearRefreshToken)}
              className="w-full text-sm text-white px-4 py-2 bg-red-500 hover:bg-red-700 rounded-md"
            >
              Logout
            </DisclosureButton>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default NavBar;
