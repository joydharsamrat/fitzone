/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserByIdQuery,
  useUpdateUserInfoMutation,
} from "../../redux/features/user/user.api";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader";
import Form from "../../components/shared/form/Form";
import { editProfileSchema } from "../../schemas/ProfileSchema";
import InputField from "../../components/shared/form/InputField";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { TUser } from "../../interface";

const EditProfile = () => {
  const { data: userData, isLoading: userLoading } =
    useGetUserByIdQuery(undefined);

  const [updateUserInfo, { isLoading: isUpdating }] =
    useUpdateUserInfoMutation();

  const navigate = useNavigate();

  if (userLoading) return <Loader />;

  const user: TUser = userData?.data?.data;

  const handleSubmit = async (formData: FieldValues) => {
    try {
      await updateUserInfo(formData).unwrap();
      toast.success("Profile updated successfully!");
      navigate(`${user.role === "user" ? "/user/profile" : "/admin/profile"}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Profile
      </h1>

      {user ? (
        <Form
          onSubmit={handleSubmit}
          defaultValues={{
            name: user.name,
            email: user.email,
            address: user.address || "",
            phone: user.phone || "",
          }}
          resolver={zodResolver(editProfileSchema)}
        >
          <InputField type="text" name="name" label="Full Name" />
          <InputField type="email" name="email" label="Email Address" />
          <InputField type="text" name="address" label="Address" />
          <InputField type="text" name="phone" label="Phone Number" />

          <button type="submit" disabled={isUpdating} className="btn-secondary">
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </Form>
      ) : (
        <p className="text-gray-600">Unable to load user data</p>
      )}
    </div>
  );
};

export default EditProfile;
