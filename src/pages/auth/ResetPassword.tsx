/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Form from "../../components/shared/form/Form";
import { useResetPassMutation } from "../../redux/features/auth/authApi";
import styles from "../../styles/login.module.css";
import InputField from "../../components/shared/form/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "../../schemas/ResetPasswordSchema";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [resetPassword] = useResetPassMutation();

  const defaultValues = { newPassword: "", confirmPassword: "" };

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("Updating password...");
    try {
      const resetData = { token, password: data.newPassword };
      await resetPassword(resetData).unwrap();
      toast.success("Password reset successful!", { id: loadingToast });
      navigate("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(
        `${error?.data?.message}` || "Failed to reset password. Try again.",
        { id: loadingToast }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row justify-around items-center min-h-screen px-5 py-12 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="md:w-1/3 rounded-md flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Reset Your Password
          </h2>
          <p className="text-center mb-6 md:mb-0">
            Enter a new password to regain access to your account and continue
            your fitness journey.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gradient md:w-1/3 p-10 rounded-md">
          <h1 className="text-3xl font-semibold text-center mb-5 text-white">
            Reset Password
          </h1>

          <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(resetPasswordSchema)}
          >
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
            <div className="mt-4 flex justify-center">
              <input
                type="submit"
                value="Reset Password"
                className="btn-primary w-full"
              />
            </div>
          </Form>

          <p className="mt-5 text-center text-white text-xs">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
