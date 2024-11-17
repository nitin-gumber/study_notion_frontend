import toast from "react-hot-toast";

import { setUser } from "../../slices/profileSlice";
import { apiConnector } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { logout } from "./authAPI";

const { 
  UPDATE_PROFILE_API,
  CHANGE_PASSWORD_API,
} = settingsEndpoints;

// **************** UPDATE PROFILE ****************
// Update Profile Information
export function updateProfile(token, data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      dispatch(setUser({ ...response.data.data }));
      response && navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("ERROR............", error);
      toast.error(error.response.data.message || "Something went wrong");
    }
    toast.dismiss(toastId);
  };
}


// **************** CHANGE PASSWORD ****************
// Change Password

export function changePassword(token, data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, data, {
        Authorization: `Bearer ${token}`,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      toast.success(response.data.message);
      response && navigate("/dashboard/my-profile");
    } catch (error) {
      console.log("ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
  };
}