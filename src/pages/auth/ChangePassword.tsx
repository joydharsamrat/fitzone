/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useChangePassMutation } from "../../redux/features/auth/authApi";
import Form from "../../components/shared/form/Form";
import InputField from "../../components/shared/form/InputField";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../redux/features/hooks";
import { getCurrentUser, setUser } from "../../redux/features/auth/authSlice";
import styles from "../../styles/login.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../schemas/ChangePasswordSchema";
import { TUserAuth } from "../../interface";

const ChangePassword = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getCurrentUser);
  const [changePassword] = useChangePassMutation();
  const dispatch = useAppDispatch();
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
  };

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("Updating password...");

    try {
      const res = await changePassword(data).unwrap();
      const userInfo: TUserAuth = jwtDecode(res.data.token);
      console.log({ userInfo });
      dispatch(setUser({ user: userInfo, token: res.data.token }));
      toast.success("Password changed successfully!", { id: loadingToast });
      navigate(
        `${userInfo.role === "user" ? "/user/profile" : "/admin/profile"}`
      );
    } catch (error: any) {
      console.error(error);
      toast.error(
        `${error?.data?.message}` ||
          "Password change failed. Please try again.",
        { id: loadingToast }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row justify-around items-center min-h-screen px-5 py-12 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="md:w-1/3 flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Update Your Password
          </h2>
          <p className="text-center mb-6">
            Stay secure by regularly updating your password. Make sure it's
            strong and unique!
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gradient md:w-1/3 p-10 rounded-md">
          <h1 className="text-3xl font-semibold text-center mb-5 text-white">
            Change Password
          </h1>

          <Form
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            resolver={zodResolver(changePasswordSchema)}
          >
            <InputField
              label="Old Password"
              name="oldPassword"
              type="password"
            />
            <InputField
              type="password"
              name="newPassword"
              label="New Password"
            />
            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />

            <div className="flex justify-center">
              <input
                type="submit"
                value="Update Password"
                className="btn-primary mt-5"
              />
            </div>
          </Form>

          <p className="mt-5 text-center text-white text-sm">
            Go back to{" "}
            <Link
              to={user?.role === "user" ? "/user/profile" : "/admin/profile"}
              className="text-blue-400 hover:underline"
            >
              Profile
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
