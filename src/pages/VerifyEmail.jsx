import React, { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendOtp, signup } from "../services/operations/authAPI";

const VerifyEmail = () => {

  // Redux Hooks definations
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get signup data from redux store and loading state from redux store
  const { signupData, loading } = useSelector((state) => state.auth);

  // OTP state to store OTP entered by user in input field
  const [otp, setOtp] = useState("");

  useEffect(() => {
    // only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signup(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner sm:text-sm"></div>
        </div>
      ) : (
        <div className="max-w-[450px] md:max-w-[550px] mx-auto p-4 lg:p-8">
          <h2 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h2>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to your email address. Please
            enter the code below.
          </p>

          <form onSubmit={handleOnSubmit}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:boder-0 focus:outline-2 focus:outline-yellow-5"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                marginTop: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link
              to="/signup"
              className="text-richblack-100 flex items-center gap-x-2"
            >
              <BiArrowBack className="md:text-[1.3rem]" />
              Back to Signup
            </Link>

            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email, navigate, false))}
            >
              <RxCountdownTimer className="md:text-[1.3rem]" />
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;