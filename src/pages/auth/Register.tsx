/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/shared/form/Form";
import InputField from "../../components/shared/form/InputField";
import { registerSchema } from "../../schemas/RegisterSchema";
import toast from "react-hot-toast";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/features/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate, NavLink } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [createUser] = useSignUpMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onSubmit = async (data: any) => {
    const loadingToast = toast.loading("Loading...");

    try {
      const res = await createUser(data).unwrap();

      const user = jwtDecode(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));
      toast.success("Sign up successful!", { id: loadingToast });
      navigate("/");
    } catch (error: any) {
      toast.error(
        error.message ||
          error?.data?.message ||
          "Sign up failed. Please try again.",
        {
          id: loadingToast,
        }
      );
      console.log(error);
    }
  };

  return (
    <div className="px-5 md:px-20 my-12 md:my-20">
      <div className="flex flex-col md:flex-row justify-center items-center">
        {/* Image Section */}
        <div className="md:w-1/3 p-10 bg-neutral-200 rounded-t-xl md:rounded-s-xl md:rounded-tr-none flex flex-col items-center justify-center">
          {/* Reserved space for the image */}
          <div
            className={`w-full h-[300px] rounded-md ${
              isImageLoaded ? "" : "bg-gray-300 animate-pulse"
            }`}
          >
            <img
              src="https://i.ibb.co.com/C9w0nvW/register.webp"
              alt="Register Illustration"
              className={`w-full h-auto rounded-md ${
                isImageLoaded ? "visible" : "invisible"
              }`}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="px-5 bg-gradient md:w-1/3 p-10 rounded-b-xl md:rounded-e-xl md:rounded-bl-none">
          <h1 className="text-3xl font-semibold text-center mb-5 text-white">
            Register
          </h1>

          <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(registerSchema)}
          >
            <InputField type="text" name="name" label="Full Name" />
            <InputField type="email" name="email" label="Email Address" />
            <InputField type="password" name="password" label="Password" />
            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <div className="flex justify-center">
              <input
                type="submit"
                value="Register"
                className="btn-primary mt-5"
              />
            </div>
          </Form>

          {/* Link to Login Page */}
          <p className="text-sm text-white mt-5 text-center">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-blue-300 hover:text-blue-500 underline"
            >
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
