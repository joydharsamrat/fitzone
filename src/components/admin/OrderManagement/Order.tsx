/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaChevronDown } from "react-icons/fa";
import "animate.css";
import { TOrder } from "../../../interface";
import { formatDate } from "../../../utils/FormatDate";
import { useUpdateOrderStatusMutation } from "../../../redux/features/order/order.api";
import {
  OrderStatus,
  statusColors,
  statusText,
} from "../../../constants/OrderStatusConstants";
import toast from "react-hot-toast";

type OrderProps = {
  order: TOrder;
  isShippingOpen: string | null;
  handleShippingOpen: (id: string) => void;
};

const Order = ({ order, isShippingOpen, handleShippingOpen }: OrderProps) => {
  const [updateOrder] = useUpdateOrderStatusMutation();

  const handleOrderStatusUpdate = async (id: string, status: string) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const res = await updateOrder({ id, status });
      if (res.error) {
        throw new Error("Failed to update status");
      }
      toast.success(`${status} successfully!`, { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error.message ||
          error?.data?.message ||
          "Failed to update. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };

  const renderActions = () => {
    switch (order.status) {
      case "pending":
        return (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() =>
                handleOrderStatusUpdate(order._id, OrderStatus.CANCELED)
              }
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                handleOrderStatusUpdate(order._id, OrderStatus.SHIPPED)
              }
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Ship
            </button>
          </div>
        );
      case "shipped":
        return (
          <div className="flex gap-2 mt-4">
            <button
              onClick={() =>
                handleOrderStatusUpdate(order._id, OrderStatus.DELIVERED)
              }
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Deliver
            </button>
            <button
              onClick={() =>
                handleOrderStatusUpdate(order._id, OrderStatus.RETURNED)
              }
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
            >
              Return
            </button>
          </div>
        );
      case "delivered":
      case "canceled":
      case "returned":
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 box-shadow bg-white relative">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row justify-between items-start">
        <div>
          <p className="text-lg font-semibold">Order ID: {order._id}</p>
          <p className="text-sm text-gray-600">
            Date: {formatDate(new Date(order.createdAt))}
          </p>
          <p className="text-sm text-gray-600">
            Transaction ID: {order.transactionId}
          </p>
          <p className="text-sm text-gray-600">
            Status:{" "}
            <span className={statusColors[order.status] || "text-gray-500"}>
              {statusText[order.status] || "Unknown status"}
            </span>
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-lg font-bold">
            Total: ${order.totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            Shipping: ${order.shippingCharge.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="my-6">
        <h3 className="text-lg font-semibold mb-4">Products</h3>
        <ul className="space-y-4 animate__animated animate__fadeInUp">
          {/* First product is always visible */}
          <li className="flex items-center space-x-4 border-b pb-4">
            <img
              src={order.products[0].image}
              alt={order.products[0].name}
              className="h-16 w-16 object-cover rounded-md animate__animated animate__zoomIn"
            />
            <div className="flex-1">
              <p className="text-lg font-medium">{order.products[0].name}</p>
              <p className="text-sm text-gray-600">
                Price: ${order.products[0].price.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">
                Quantity: {order.products[0].quantity}
              </p>
            </div>
            <p className="text-lg font-bold">
              ${order.products[0].subtotal.toFixed(2)}
            </p>
          </li>

          {/* Other products are hidden unless isShippingOpen is set */}
          {isShippingOpen === order._id &&
            order.products.slice(1).map((product) => (
              <li
                key={product._id}
                className="flex items-center space-x-4 border-b pb-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded-md animate__animated animate__zoomIn"
                />
                <div className="flex-1">
                  <p className="text-lg font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    Price: ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <p className="text-lg font-bold">
                  ${product.subtotal.toFixed(2)}
                </p>
              </li>
            ))}
        </ul>
      </div>

      {/* Customer Details */}
      <div
        className={`optionsContainer ${
          isShippingOpen === order._id ? "open" : ""
        }`}
      >
        <div className="overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Shipping Details</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Name:</span>{" "}
            {order.customerDetails.fullName}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Address:</span>{" "}
            {order.customerDetails.address}, {order.customerDetails.city},{" "}
            {order.customerDetails.state}, {order.customerDetails.zip}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Phone:</span>{" "}
            {order.customerDetails.phone}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Email:</span>{" "}
            {order.customerDetails.email}
          </p>
        </div>
      </div>

      {/* Admin Actions */}
      {renderActions()}

      {/* Shipping Toggle Button */}
      <div
        onClick={() => handleShippingOpen(order._id)}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 border rounded-full flex justify-center items-center bg-primary-700 text-white cursor-pointer"
      >
        <button
          style={{
            transform:
              isShippingOpen === order._id ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          <FaChevronDown />
        </button>
      </div>
    </div>
  );
};

export default Order;
