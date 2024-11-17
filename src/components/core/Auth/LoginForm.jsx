import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  // Redux Hooks definations
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setshowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password, navigate));
  };

  return (
    <>
      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-4 mt-8"
      >
        {/* Email Address */}
        <div>
          <label htmlFor="email" className="text-[14px] text-richblack-5">
            Email Address <sup className="text-yellow-5">*</sup>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            autoComplete="on"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          />
          {errors.email && (
            <span className="text-[12px] text-yellow-100">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label htmlFor="password" className="text-[14px] text-richblack-5">
            Password <sup className="text-yellow-5">*</sup>
          </label>
          <input
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                message:
                  "Password should contain atleast 1 uppercase, 1 lowercase, 1 number and should be atleast 8 characters long",
              },
            })}
            className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          />
          {errors.password && (
            <span className="text-[12px] text-yellow-100">
              {errors.password.message}
            </span>
          )}
          <span
            className=" absolute top-[40%] right-3 cursor-pointer"
            onClick={() => setshowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEye className=" text-richblack-100 text-[1.5rem]" />
            ) : (
              <AiOutlineEyeInvisible className=" text-richblack-100 text-[1.5rem]" />
            )}
          </span>

          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
        </div>

        <button
          type="submit"
          className=" bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] font-inter mt-6 w-full"
        >
          Login
        </button>
      </form>
      <div className="mt-4 flex items-center justify-center">
        <p className="text-richblack-5 text-[0.875] font-inter flex items-center gap-2">
          Don't have an account?
          <span>
            <Link to="/signup" className="text-yellow-50">
              Create Account
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
