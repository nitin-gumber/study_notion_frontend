import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { getPasswordRestToken } from "../services/operations/authAPI";

export default function ForgotPassword () {
  // Redux Hooks definations for dispatch
  const dispatch = useDispatch();

  // Get loading state from redux store to show spinner while sending email
  const { loading } = useSelector((state) => state.auth);

  // Email send state to show email sent message after sending email
  const [emailSend, setEmailSend] = useState(false);
  const [email, setEmail] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Function to handle form submission and dispatch reset password action to reset password
  const onSubmit = (data) => {
    const { email } = data;
    // dispatch reset password action to reset password and navigate to login page
    dispatch(getPasswordRestToken(email, setEmailSend));
  };

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center text-richblack-5">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h2 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            {!emailSend ? "Reset your Password" : "Check your Email"}
          </h2>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSend
              ? "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            {!emailSend && (
              <>
                <label htmlFor="email" className="text-[14px] text-richblack-5">
                  Email Address <sup className="text-yellow-5">*</sup>
                </label>
                <input
                  name="email"
                  id="email"
                  type="email"
                  autoComplete="on"
                  placeholder="Enter your email address"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-richblack-800 text-richblack-100 font-inter font-medium py-2 px-4 rounded-[8px] border border-richblack-700 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
                />
                {errors.email && (
                  <span className="text-[12px] text-yellow-100">
                    {errors.email.message}
                  </span>
                )}
              </>
            )}
            {isSubmitSuccessful && (
              <p 
                className="text-[14px] text-richblack-5 font-semibold"
              >
                Email sent successfully
              </p>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              {!emailSend ? "Reset Password" : "Resend Email"}
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> <span>Back to Login</span>
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
