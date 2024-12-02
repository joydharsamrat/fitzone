import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AddProduct from "../pages/product/AddProduct";
import Products from "../pages/product/Products";
import ProductDetails from "../pages/product/ProductDetails";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import UserRoute from "../components/layouts/UserRoute";
import Profile from "../pages/user/Profile";
import CartPage from "../pages/user/Cart";
import Orders from "../pages/user/Orders";
import Checkout from "../pages/user/Checkout";
import StripeProvider from "../components/Providers/StripeProvider";
import SuccessPage from "../pages/user/Success";
import EditProfile from "../pages/user/EditProfile";

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
      { path: "/add-product", element: <AddProduct /> },
    ],
  },
  {
    path: "/user",
    element: (
      <UserRoute>
        <MainLayout />
      </UserRoute>
    ),
    children: [
      { path: "profile", element: <Profile /> },
      { path: "profile/edit", element: <EditProfile /> },
      { path: "orders", element: <Orders /> },
      { path: "cart", element: <CartPage /> },
      { path: "success", element: <SuccessPage /> },
      {
        path: "checkout",
        element: (
          <StripeProvider>
            <Checkout />
          </StripeProvider>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
