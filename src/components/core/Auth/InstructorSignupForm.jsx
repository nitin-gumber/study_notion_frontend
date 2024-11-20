import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../../util/constant";
import { sendOtp } from "../../../services/operations/authAPI";
import { setSignupData } from "../../../slices/authSlice";
import { isDisposableEmail } from "../../../util/checkDisposableEmail";

function InstructorSignupForm() {
  // Redux Hooks definations
  const dispatch = useDispatch();
  const navigate = useNavigate();

    // Account Type for Signup Form (Instructor)
  const accountType = ACCOUNT_TYPE.INSTRUCTOR;

  // Password visibility state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // OnSubmit Function for Signup Form
  const onSubmit = (data) => {
    const signupData = {
      ...data,
      accountType,
    };

    // Check if email is disposable or not
    const result = isDisposableEmail(data.email);
    if (result) {
      // set signup data to redux store
      dispatch(setSignupData(signupData));
      // send otp to email
      dispatch(sendOtp(data.email, navigate, true));
    } else {
      toast.error("Disposable Email Address is not allowed");
    }
  };

  // useEffect to reset form after successful submission of form data
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      {/*  Siwfiting Tab Student & Instructor */}
      {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}

      <p className="text-[20px] font-semibold font-inter text-richblack-25 bg-richblack-800 py-2 px-4 w-fit rounded-md my-5">
        Instructor Signup
      </p>

      {/* Signup Form for SignUp */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
        <div className="flex gap-3">
          <div className="w-full flex flex-col">
            {/* First Name */}
            <label htmlFor="firstName" className="text-[14px] text-richblack-5">
              First Name <sup className="text-yellow-50">*</sup>
            </label>
            <input
              name="firstName"
              id="firstName"
              type="text"
              autoComplete="off"
              {...register("firstName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "First Name should be atleast 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "First Name should be atmost 20 characters",
                },
                pattern: { value: /^[A-Za-z]+$/i, message: "Only Alphabets" },
              })}
              className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            />
            {errors.firstName && (
              <span className="text-[12px] text-yellow-100">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col">
            {/* Last Name */}
            <label htmlFor="lastName" className="text-[14px] text-richblack-5">
              Last Name <sup className="text-yellow-50">*</sup>
            </label>
            <input
              name="lastName"
              id="lastName"
              type="text"
              autoComplete="off"
              {...register("lastName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Last Name should be atleast 3 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Last Name should be atmost 20 characters",
                },
                pattern: { value: /^[A-Za-z]+$/i, message: "Only Alphabets" },
              })}
              className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            />
            {errors.lastName && (
              <span className="text-[12px] text-yellow-100">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        {/* Email Address */}
        <div>
          <label htmlFor="email" className="text-[14px] text-richblack-5">
            Email Address <sup className="text-yellow-50">*</sup>
          </label>
          <input
            name="email"
            id="email"
            type="email"
            autoComplete="on"
            {...register("email", {
              required: true,
              pattern: {
                value: /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/,
                message: "Invalid Email Address",
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

        {/* Create & Confirm Password */}
        <div className=" flex gap-x-3">
          <div className=" relative w-full flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-[14px] text-richblack-5"
            >
              Password <sup className="text-yellow-50">*</sup>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              autoComplete="new-password"
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

            {/* Show Password */}
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

          <div className=" relative w-full flex flex-col">
            <label
              htmlFor="confirmPassword"
              className="text-[14px] text-richblack-5"
            >
              Confirm Password <sup className="text-yellow-50">*</sup>
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: true,
                validate: (value) =>
                  value === document.getElementById("password").value ||
                  "The passwords do not match",
              })}
              className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            />
            {errors.confirmPassword && (
              <span className="text-[12px] text-yellow-100">
                {errors.confirmPassword.message}
              </span>
            )}

            {/* Show Confirm Password */}
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
        </div>

        {/* Button */}
        <button
          type="submit"
          className=" bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] font-inter mt-6 w-full"
        >
          Create Account
        </button>
      </form>

      <div className="mt-4 flex items-center justify-center">
        <p className="text-richblack-5 text-[0.875] font-inter flex items-center gap-2">
          Already have an account?
          <span>
            <Link to="/login" className="text-yellow-50">
              Login
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default InstructorSignupForm;
