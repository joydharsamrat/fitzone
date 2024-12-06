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
import styles from "../../styles/register.module.css";

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
    <div className={styles.container}>
      <div className="flex flex-col md:flex-row justify-around items-center min-h-screen max-w-7xl mx-auto py-12 md:py-20">
        {/* Image Section */}
        <div className="md:w-1/3 text-white  flex flex-col items-center justify-center ">
          <h2 className="text-2xl font-semibold text-center  mb-4">
            Join the FITZONE Community!
          </h2>
          <p className="text-center  mb-6 md:mb-0">
            Create an account today to start tracking your fitness journey,
            access exclusive content, and shop for premium fitness equipment!
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-gradient md:w-1/3 p-10 rounded-md">
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
