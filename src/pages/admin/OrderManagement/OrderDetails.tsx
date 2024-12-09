import { useParams, useNavigate } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../redux/features/order/order.api";
import Loader from "../../../components/shared/Loader";
import { formatDate } from "../../../utils/FormatDate";
import { statusColors } from "../../../constants/OrderStatusConstants";
import { TOrder } from "../../../interface";
import { LuArrowLeftFromLine } from "react-icons/lu";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: orderData, isLoading } = useGetOrderByIdQuery(id);
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const order: TOrder = orderData?.data || {};
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-primary-700 font-semibold hover:underline"
      >
        <LuArrowLeftFromLine /> Back to Orders
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section */}
        <div className="bg-white col-span-2  rounded-lg p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2">
              <h2 className="text-sm md:text-xl font-semibold">
                Order ID: {order._id}
              </h2>
              <span
                className={` ${
                  statusColors[order.status] || "bg-gray-700 text-white"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">
              {formatDate(new Date(order.createdAt))}
            </p>
          </div>

          {/* Products */}
          <div className="shadow-sm p-4 rounded-md mb-5 bg-white">
            <h3 className="text-xl font-semibold mb-4">Products</h3>
            <div className="space-y-6">
              {order.products?.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col md:flex-row justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  {/* Product Image and Name */}
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="text-md font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Price and Subtotal */}
                  <div className="flex flex-col items-start md:items-end justify-between gap-2 md:gap-0">
                    <p className="text-md font-semibold">
                      Price: ${product.price.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Subtotal: ${product.subtotal.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* Total Price */}
            <div className="mt-6 text-right">
              <p className="text-lg font-semibold">
                Total Price: ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-white  rounded-lg p-5 ">
          <div className="shadow-sm p-2 rounded-md mb-5">
            <h3 className="text-sm font-semibold mb-4">User Details</h3>
            <div className=" text-xs space-y-2">
              <p>{order.user?.name}</p>
              <p>{order.user?.email}</p>
            </div>
          </div>

          <div className="shadow-sm p-2 rounded-md mb-5">
            <h3 className="text-sm font-semibold mb-4">
              Billing & Shipping Details
            </h3>
            <div className="text-xs space-y-2">
              <p>{order.customerDetails?.fullName}</p>
              <p>{order.customerDetails?.email}</p>
              <p>{order.customerDetails?.phone}</p>
              <p>{order.customerDetails?.address}</p>
              <p>{order.customerDetails?.city}</p>
              <p>{order.customerDetails?.state}</p>
              <p>{order.customerDetails?.zip}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
