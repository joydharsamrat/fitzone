import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layouts/MainLayout";
import App from "../App";
import AdminDashboard from "../pages/admin/Dashboard/AdminDashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
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
import AddProduct from "../pages/admin/ProductManagement/AddProduct";
import AdminRoute from "../components/layouts/AdminRoute";
import OrderDetails from "../pages/admin/OrderManagement/OrderDetails";
import Unsubscribe from "../pages/newsletter/Unsubscribe";
import SubscriberManagement from "../pages/admin/newsletterManagement/SubscriberManagement";
import Categories from "../pages/admin/CategoryManagement/Categories";
import EditCategory from "../pages/admin/CategoryManagement/EditCategory";
import AddCategory from "../pages/admin/CategoryManagement/AddCategory";
import AdminProfile from "../pages/admin/Profile/Profile";
import ChangePassword from "../pages/auth/ChangePassword";
import ForgetPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFound from "../pages/NotFound";

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
      { path: "/newsletter/unsubscribe", element: <Unsubscribe /> },
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
    path: "/admin/profile",
    element: (
      <AdminRoute>
        <MainLayout></MainLayout>
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminProfile /> },
      { path: "edit", element: <EditProfile /> },
    ],
  },
  {
    path: "/admin/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },

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
        path: "order-management/:id",
        element: <OrderDetails />,
      },
      {
        path: "user-management",
        element: <UserManagement />,
      },
      {
        path: "newsletter-management/subscribers",
        element: <SubscriberManagement />,
      },
      {
        path: "category-management/categories",
        element: <Categories />,
      },
      {
        path: "category-management/add-category",
        element: <AddCategory />,
      },
      {
        path: "category-management/categories/edit/:id",
        element: <EditCategory />,
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
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
