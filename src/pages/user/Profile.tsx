/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaRegEdit } from "react-icons/fa";
import { TOrder } from "../../interface";
import { useGetOrderByUserIdQuery } from "../../redux/features/order/order.api";
import { useGetUserByIdQuery } from "../../redux/features/user/user.api";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import Loader from "../../components/shared/Loader";
import ProfileImage from "../../components/user/ProfileImage";

const Profile = () => {
  const { data: userData, isLoading: userLoading } =
    useGetUserByIdQuery(undefined);
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrderByUserIdQuery(undefined);
  const navigate = useNavigate();

  const user = userData?.data.data;
  const orders = ordersData?.data || [];

  if (userLoading || ordersLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto my-20 flex gap-8">
      {/* Profile Section */}
      <div className="w-2/3 bg-white p-6 relative">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Profile</h1>
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <ProfileImage user={user} />

          {/* Name and Email */}
          <div className="mt-4 text-center">
            <p className="text-lg font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          {/* Address */}
          <div className="mt-6 w-full border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  <HiOutlineLocationMarker />
                </span>
                <span className="font-medium">Address:</span>
              </div>
              {user.address ? (
                <span className="text-gray-600">{user.address}</span>
              ) : (
                <button
                  onClick={() => navigate("/user/profile/edit")}
                  className="text-3xl text-gray-500 rounded-full border-2 w-12 h-12 flex justify-center items-center shadow-inner"
                >
                  <GoPlus />
                </button>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="mt-6 w-full border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-xl">
                  <MdOutlinePhoneInTalk />
                </span>
                <span className="font-medium">Phone:</span>
              </div>
              {user.phone ? (
                <span className="text-gray-600">{user.phone}</span>
              ) : (
                <button
                  onClick={() => navigate("/user/profile/edit")}
                  className="text-3xl text-gray-500 rounded-full border-2 w-12 h-12 flex justify-center items-center shadow-inner"
                >
                  <GoPlus />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/user/profile/edit")}
            className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
          >
            <FaRegEdit />
          </button>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="w-1/3 bg-white rounded-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Recent Orders
        </h1>
        {orders.length > 0 ? (
          <ul className="space-y-4">
            {orders.slice(0, 5).map((order: TOrder) => (
              <li
                key={order._id}
                className="border-b pb-2 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">Order ID: {order._id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Total: ${order?.totalPrice}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
