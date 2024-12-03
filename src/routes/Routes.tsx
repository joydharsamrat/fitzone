import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import App from "../App";
import Dashboard from "../pages/admin/Dashboard";
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
import DashboardLayout from "../components/layouts/DashboardLayout";
import ProductManagement from "../pages/admin/ProductManagement/ProductManagement";
import EditProduct from "../pages/admin/ProductManagement/EditProduct";
import OrderManagement from "../pages/admin/OrderManagement/Orders";
import UserManagement from "../pages/admin/UserManagement/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <App /> },
      { path: "/home", element: <App /> },
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
    path: "/admin/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "product-management/products",
        element: <ProductManagement />,
      },
      {
        path: "product-management/products/edit/:id",
        element: <EditProduct />,
      },
      {
        path: "product-management/add-product",
        element: <AddProduct />,
      },
      {
        path: "order-management",
        element: <OrderManagement />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
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
