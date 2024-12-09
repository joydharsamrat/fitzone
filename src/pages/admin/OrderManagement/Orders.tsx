/* eslint-disable @typescript-eslint/no-explicit-any */
import Loader from "../../../components/shared/Loader";
import { TOrder } from "../../../interface";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../redux/features/order/order.api";
import { formatDate } from "../../../utils/FormatDate";
import {
  OrderStatus,
  statusColors,
} from "../../../constants/OrderStatusConstants";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const OrderManagement = () => {
  const { data, isLoading } = useGetAllOrdersQuery(undefined);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <h1 className="text-4xl font-bold mb-8 animate__animated animate__fadeInDown">
        Order Management
      </h1>

      {data?.data?.length === 0 ? (
        <p className="text-lg text-gray-600 animate__animated animate__fadeIn">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left min-w-[150px]">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((order: TOrder) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">
                    {formatDate(new Date(order.createdAt))}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={statusColors[order.status] || "text-gray-500"}
                    >
                      {order.status || "Unknown status"}
                    </span>
                  </td>
                  <td className="px-4 py-2">${order.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      {order.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order._id,
                                OrderStatus.CANCELED
                              )
                            }
                            className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order._id,
                                OrderStatus.SHIPPED
                              )
                            }
                            className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                          >
                            Ship
                          </button>
                        </>
                      )}
                      {order.status === "shipped" && (
                        <>
                          <button
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order._id,
                                OrderStatus.DELIVERED
                              )
                            }
                            className="bg-green-500 text-white text-xs px-2 py-1 rounded hover:bg-green-600"
                          >
                            Deliver
                          </button>
                          <button
                            onClick={() =>
                              handleOrderStatusUpdate(
                                order._id,
                                OrderStatus.RETURNED
                              )
                            }
                            className="bg-purple-500 text-white text-xs px-2 py-1 rounded hover:bg-purple-600"
                          >
                            Return
                          </button>
                        </>
                      )}
                      {/* Add "Details" button */}
                      <Link
                        to={`/admin/dashboard/order-management/${order._id}`}
                        className="bg-gray-500 text-white text-xs px-2 py-1 rounded hover:bg-gray-600"
                      >
                        Details
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;
