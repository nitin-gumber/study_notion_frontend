import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { resetCart } from "../../slices/cartSlice";

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

// ************ Send OTP ************
// This function is used to sign up a user
export function sendOtp(email, navigate, isResend = true) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        checkUserPreset: true,
      });
      toast.success(response.data.message);
      // If the user is trying to resend the OTP, navigate to the verify email page
      if (isResend) {
        navigate("/verify-email");
      }
    } catch (error) {
      console.log("ERROR while sending OTP", error);
      toast.error(error.response?.data?.message);
    }
    dispatch(setLoading(false));
  };
}

// ************ Sign Up ************
// This function is used to sign up a user
export function signup(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });
      toast.success(response.data.message);
      dispatch(setLoading(false));
      navigate("/login");
    } catch (error) {
      console.log("ERROR while signing up", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

// ************ Login ************
// This function is used to log in a user
export function login(email, password, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      // Set token and user in redux store and local storage and navigate to the dashboard
      dispatch(setToken(response.data.token));
      dispatch(setUser({ ...response.data.user }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      // Navigate to the dashboard and show a success toast message
      navigate("/dashboard/my-profile");
      toast.success(response.data.message);
    } catch (error) {
      console.log("ERROR while logging in", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

// ************ Get Password Reset Token ************
// This function is used to get a password reset token for a user
export function getPasswordRestToken(email, setEmailSend) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", RESETPASSTOKEN_API, {
        email,
      });

      // Set email send state to true and show a success toast message after sending the email
      setEmailSend(true);
      dispatch(setLoading(false));
      toast.success(response.data.message);
    } catch (error) {
      console.log("ERROR while getting password reset token", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

// ************ Reset Password ************
// This function is used to reset a user's password
export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("POST", RESETPASSWORD_API, {
        password,
        confirmPassword,
        token,
      });

      // Show a success toast message and navigate to the login page after resetting the password
      dispatch(setLoading(false));
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      console.log("ERROR while resetting password", error);
      toast.error(error.response.data.message);
    }
    dispatch(setLoading(false));
  };
}

// ************ LogOut  ************
// This function is used to log out a user by removing the token from the local storage and the redux store
export function logout(navigate) {
  return async (dispatch) => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };
}
