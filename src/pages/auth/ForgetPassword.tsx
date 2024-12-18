/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues } from "react-hook-form";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useForgotPassMutation } from "../../redux/features/auth/authApi";
import Form from "../../components/shared/form/Form";
import InputField from "../../components/shared/form/InputField";
import { useState } from "react";
import styles from "../../styles/login.module.css";

const ForgetPassword = () => {
  const [getLink] = useForgotPassMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    const loadingToast = toast.loading("Sending reset link...");

    try {
      await getLink(data).unwrap();
      toast.success("Check your email for the reset link!", {
        id: loadingToast,
      });
      setIsSuccess(true);
    } catch (error: any) {
      console.log(error);
      toast.error(
        `${error?.data?.message}` ||
          "Failed to send reset link. Please try again.",
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
            Reset Your Password
          </h2>
          <p className="text-center mb-6">
            Enter your registered email to receive a password reset link.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gradient md:w-1/3 p-10 rounded-md">
          {isSuccess ? (
            <div className="text-center text-white">
              <h1 className="text-3xl font-semibold mb-5">Email Sent!</h1>
              <p className="text-sm mb-5">
                If the email is registered, you'll receive a reset link shortly.
              </p>
              <div className="flex justify-center space-x-4">
                <Link to="/" className="text-blue-400 hover:underline">
                  Home
                </Link>
                <Link to="/login" className="text-blue-400 hover:underline">
                  Login
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-center mb-5 text-white">
                Get Reset Link
              </h1>
              <Form onSubmit={onSubmit} defaultValues={{ email: "" }}>
                <InputField type="email" label="Email Address" name="email" />
                <div className="flex flex-col items-center mt-5">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn-primary mb-3"
                  />
                </div>
              </Form>
              <p className="mt-5 text-center text-white text-sm">
                Go back to{" "}
                <Link to="/login" className="text-blue-400 hover:underline">
                  Login
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
