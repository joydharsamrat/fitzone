/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "../../components/shared/form/Form";
import InputField from "../../components/shared/form/InputField";
import toast from "react-hot-toast";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/features/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { NavLink, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/LoginSchema";

const Login = () => {
  const defaultValues = {
    email: "",
    password: "",
  };
  const [loginUser] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    const loadingToast = toast.loading("Loading...");

    try {
      const res = await loginUser(data).unwrap();

      const user = jwtDecode(res.data.token);
      dispatch(setUser({ user, token: res.data.token }));
      toast.success("Login successful!", { id: loadingToast });
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
        {/* Image Section */}
        <div className="md:w-1/3 p-10 bg-neutral-200 rounded-t-xl md:rounded-s-xl md:rounded-tr-none flex flex-col items-center justify-center">
          <div className="relative w-full h-[300px] md:h-[400px]">
            <img
              src="https://i.ibb.co.com/C9w0nvW/register.webp"
              alt="Register Illustration"
              className="w-full h-full object-cover rounded-md"
              loading="lazy"
            />
          </div>
        </div>

        {/* Form Section */}
        {/* Form Section */}
        <div className="px-5 bg-gradient md:w-1/3 p-10 rounded-b-xl md:rounded-e-xl md:rounded-bl-none">
          <h1 className="text-3xl font-semibold text-center mb-5 text-white">
            Login
          </h1>

          <Form
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            resolver={zodResolver(loginSchema)}
          >
            <InputField type="email" name="email" label="Email Address" />
            <InputField type="password" name="password" label="Password" />

            <div className="flex justify-center">
              <input type="submit" value="Login" className="btn-primary mt-5" />
            </div>
          </Form>

          <p className="mt-5 text-center text-white text-sm">
            New to FITZONE?{" "}
            <NavLink to="/register" className="text-blue-400 hover:underline">
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
