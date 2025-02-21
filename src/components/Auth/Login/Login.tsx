import { Link, useNavigate } from "react-router-dom";
import AppForm from "../../CustomForm/AppForm";
import AppInput from "../../CustomForm/AppInput";
import AppInputPassword from "../../CustomForm/AppInputPassword";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/slices/authSlice";
import axios from "axios";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "@/api/axiosInstance";
// import LoaderWithBlurBG from "../../Loader/LoaderWithBlurBG";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const accessToken = response?.data?.data?.accessToken;
      const refreshToken = response?.data?.data?.refreshToken;

      // Store access token in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Decode user token and get info
      const decodedUser = jwtDecode<{ role: string; email: string }>(
        accessToken
      );
      //  Construct the decoded user object
      const actualUserData = {
        role: decodedUser?.role as string,
        email: decodedUser?.email as string,
      };

      dispatch(login({ user: actualUserData }));
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <Helmet>
        <title>FabAds | Login</title>
      </Helmet>
      <div className="w-full max-w-sm p-8 bg-gray-800 shadow-lg rounded-lg border border-gray-700">
        <div className="flex flex-col items-center justify-center mb-2">
          <Link to="/">
            <img className="w-20" src="/logo.png" alt="Logo" />
          </Link>
        </div>
        <h2 className="text-xl font-bold text-center text-gray-100 mb-4">
          Login to Your Account
        </h2>

        {/* Show Error Message */}
        {error && (
          <p className="text-red-500 text-center text-sm mb-4">{error}</p>
        )}

        <AppForm
          onSubmit={onSubmit}
          buttonText={loading ? "Logging in..." : "Login"}
          submitButtonStyles="bg-blue-500 hover:bg-blue-600 text-white"
          defaultValues={{ email: "", password: "" }}
        >
          <div className="mb-4">
            <AppInput
              className="w-full mb-4 bg-[#2D394B] border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
              name="email"
              label="Email"
              labelStyles="text-white"
              placeholder="Enter your email"
            />
          </div>

          <AppInputPassword
            className="w-full mb-4 bg-gray-700 border border-gray-600 text-gray-300 placeholder-gray-400 focus:ring focus:ring-blue-500 focus:border-blue-500"
            name="password"
            label="Password"
            labelStyles="text-white"
            placeholder="Enter your password"
          />
        </AppForm>
      </div>
    </div>
  );
};

export default Login;
