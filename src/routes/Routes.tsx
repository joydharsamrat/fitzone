import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Cart from "../pages/Cart";
import AddProduct from "../pages/product/AddProduct";
import Products from "../pages/product/Products";
import ProductDetails from "../pages/product/ProductDetails";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "/home", element: <App /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/products", element: <Products /> },
      { path: "/products/:productId", element: <ProductDetails /> },
      { path: "/cart", element: <Cart /> },
      { path: "/add-product", element: <AddProduct /> },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
