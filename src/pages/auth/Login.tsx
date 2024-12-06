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
import styles from "../../styles/login.module.css";

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
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row justify-around items-center min-h-screen px-5 py-12 max-w-7xl mx-auto">
        {/* Text Section */}
        <div className="md:w-1/3  rounded-md  flex flex-col items-center justify-center text-white">
          <h2 className="text-2xl font-semibold text-center  mb-4">
            Welcome to FITZONE!
          </h2>
          <p className="text-center mb-6 md:mb-0">
            Log in to access your fitness goals, track your progress, and enjoy
            the best fitness equipment and content tailored just for you.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gradient md:w-1/3 p-10 rounded-md">
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
