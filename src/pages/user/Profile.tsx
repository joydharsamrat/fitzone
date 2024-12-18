/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEnvelope, FaPhoneAlt, FaRegEdit, FaUserAlt } from "react-icons/fa";
import { TOrder } from "../../interface";
import { useGetOrderByUserIdQuery } from "../../redux/features/order/order.api";
import { useGetUserByIdQuery } from "../../redux/features/user/user.api";
import { Link, useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import Loader from "../../components/shared/Loader";
import ProfileImage from "../../components/user/ProfileImage";
import { AiOutlineEdit } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { useAppSelector } from "../../redux/features/hooks";
import { getToken } from "../../redux/features/auth/authSlice";

const Profile = () => {
  const { data: userData, isLoading: userLoading } =
    useGetUserByIdQuery(undefined);
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrderByUserIdQuery(undefined);
  const navigate = useNavigate();

  const token = useAppSelector(getToken);
  console.log(token);

  const user = userData?.data.data;
  const orders = ordersData?.data || [];

  if (userLoading || ordersLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto my-20 flex gap-8">
      {/* Profile Section */}
      <div className="w-2/3 bg-white p-6 relative">
        <h1 className="section-title">My Profile</h1>
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="bg-secondary-700 w-full flex justify-center py-16 mb-12 rounded-md relative">
            <div className="absolute -bottom-10 left-5">
              <ProfileImage user={user} />
            </div>
          </div>

          {/* Name */}
          <div className="mt-4 w-full border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaUserAlt className="text-xl text-secondary-700" />
                <span className="font-medium hidden sm:block">Name:</span>
              </div>
              <span className="text-gray-600 text-xs md:text-base">
                {user.name}
              </span>
              <button
                onClick={() => navigate("/user/profile/edit")}
                className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
              >
                <AiOutlineEdit />
              </button>
            </div>
          </div>

          {/* Email */}
          <div className="mt-6 w-full border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-xl text-secondary-700" />
                <span className="font-medium hidden sm:block">Email:</span>
              </div>
              <span className="text-gray-600 text-xs md:text-base">
                {user.email}
              </span>
              <button
                onClick={() => navigate("/user/profile/edit")}
                className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
              >
                <AiOutlineEdit />
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="mt-6 w-full border p-2 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-xl text-secondary-700" />
                <span className="font-medium hidden sm:block ">Address:</span>
              </div>
              {user.address ? (
                <>
                  <span className="text-gray-600 text-xs md:text-base">
                    {user.address}
                  </span>
                  <button
                    onClick={() => navigate("/user/profile/edit")}
                    className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
                  >
                    <AiOutlineEdit />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/user/profile/edit")}
                  className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
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
                <FaPhoneAlt className="text-xl text-secondary-700" />
                <span className="font-medium hidden sm:block">Phone:</span>
              </div>
              {user.phone ? (
                <>
                  <span className="text-gray-600 text-xs md:text-base">
                    {user.phone}
                  </span>
                  <button
                    onClick={() => navigate("/user/profile/edit")}
                    className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
                  >
                    <AiOutlineEdit />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/user/profile/edit")}
                  className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
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

        <div className="mt-6 flex justify-end">
          <Link
            to="/change-password"
            className="bg-secondary-700 text-white py-2 px-4 rounded-md shadow-md flex items-center gap-2 hover:bg-secondary-800 transition duration-300"
          >
            <FaRegEdit className="text-lg" />
            <span>Change Password</span>
          </Link>
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
