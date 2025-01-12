import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { resetPassword } from "../services/operations/authAPI";
import { Helmet } from "react-helmet-async";

const UpdatePassword = () => {
  // Redux Hooks definations for dispatch and selectors
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Get loading state from redux store to show spinner while sending email and reset password
  const { loading } = useSelector((state) => state.auth);

  // Local state to toggle password visibility for new password and confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // React hook form methods for form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Function to handle form submission and dispatch reset password action to reset password
  const onSubmit = (data) => {
    // Get password and confirm password from form data
    const { password, confirmPassword } = data;

    // Get token from url path to reset password for the user
    const token = location.pathname.split("/").at(-1);

    // dispatch reset password action to reset password and navigate to login page
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <>

      <Helmet>
        <title>Update Password - StudyNotion</title>
        <meta name="description" content="Update Password - StudyNotion" />
        <meta name="keywords" content="StudyNotion, Online Course, Course Selling Plateform, Update Password" />
      </Helmet>

      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {loading ? (
          <div className="flex items-center justify-center h-screen">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="max-w-[500px] p-4 lg:p-8">
            <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
              Choose new Password
            </h2>
            <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
              Almost done. Enter your new password and youre all set.
            </p>

            {/* Form to reset password */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-y-4"
            >
              {/* New Password */}
              <div className=" relative">
                <label
                  htmlFor="password"
                  className="text-[14px] text-richblack-5"
                >
                  New Password <sup className="text-yellow-5">*</sup>
                </label>
                <input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password", {
                    required: true,
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
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
                  className=" absolute right-3 top-1/2 bottom-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>

              {/* Confirm Password */}
              <div className=" relative">
                <label
                  htmlFor="confirmPassword"
                  className="text-[14px] text-richblack-5"
                >
                  Confirm Password <sup className="text-yellow-50">*</sup>
                </label>
                <input
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === document.getElementById("password").value ||
                      "Passwords do not match",
                  })}
                  className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                />
                {errors.confirmPassword && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.confirmPassword.message}
                  </span>
                )}
                <span
                  className=" absolute right-3 top-1/2 bottom-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                  ) : (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                  )}
                </span>
              </div>

              {/* Submit Button */}
              <div className=" static">
                <button
                  type="submit"
                  className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] font-medium text-richblack-900"
                >
                  Reset Password
                </button>
              </div>
            </form>

            {/* Back to Login */}
            <div className="mt-6 flex items-center justify-between">
              <Link to="/login" className="">
                <p className=" flex items-center gap-x-2 text-richblack-5">
                  <BiArrowBack /> Back to Login
                </p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdatePassword;
