/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUsersQuery,
  useMakeAdminMutation,
} from "../../../redux/features/user/user.api";
import { TUser } from "../../../interface";
import Loader from "../../../components/shared/Loader";
import toast from "react-hot-toast";

const UserManagement = () => {
  const { data, isLoading } = useGetUsersQuery(undefined);
  const users = data?.data || [];

  const [makeAdmin] = useMakeAdminMutation();

  const handleMakeAdmin = async (id: string) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const res = await makeAdmin(id);
      if (res.error) {
        throw new Error("Failed to make admin");
      }
      toast.success(`Made admin successfully!`, { id: loadingToast });
    } catch (error: any) {
      toast.error(
        error.message || error?.data?.message || "Failed. Please try again.",
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
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-2xl font-bold mb-6 text-center">User Management</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Email
              </th>
              <th className="px-4 py-2 text-left font-medium text-gray-600">
                Role
              </th>
              <th className="px-4 py-2 text-center font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: TUser) => (
              <tr key={user._id} className="border-b">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <img
                    src={user.image || "/assets/images/placeholder_user.jpg"}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <span>{user.name}</span>
                </td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">{user.role}</td>
                <td className="px-4 py-3 text-center">
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <span className="text-gray-500 italic">
                      No actions available
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
