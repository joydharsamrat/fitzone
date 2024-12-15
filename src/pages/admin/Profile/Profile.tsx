/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaPhoneAlt, FaRegEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GoPlus } from "react-icons/go";
import { FaUserAlt, FaEnvelope } from "react-icons/fa";
import { useGetUserByIdQuery } from "../../../redux/features/user/user.api";
import Loader from "../../../components/shared/Loader";
import ProfileImage from "../../../components/user/ProfileImage";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineEdit } from "react-icons/ai";

const AdminProfile = () => {
  const navigate = useNavigate();
  const { data: userData, isLoading: userLoading } =
    useGetUserByIdQuery(undefined);

  const user = userData?.data.data;

  if (userLoading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto my-12 flex gap-8">
      <div className="w-full bg-white p-6 relative">
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
                onClick={() => navigate("/admin/profile/edit")}
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
                onClick={() => navigate("/admin/profile/edit")}
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
                    onClick={() => navigate("/admin/profile/edit")}
                    className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
                  >
                    <AiOutlineEdit />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/admin/profile/edit")}
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
                    onClick={() => navigate("/admin/profile/edit")}
                    className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
                  >
                    <AiOutlineEdit />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate("/admin/profile/edit")}
                  className="sm:text-3xl text-gray-500 rounded-full border-2 w-6 h-6 sm:w-12 sm:h-12 flex justify-center items-center shadow-inner"
                >
                  <GoPlus />
                </button>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate("/admin/profile/edit")}
            className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-600 hover:text-gray-800"
          >
            <FaRegEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
