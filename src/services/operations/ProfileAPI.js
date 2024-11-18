import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apis";
import { toast } from "react-toastify";
import { setLoading, setUser } from "../../slices/profileSlice";
import { logout } from "./authAPI";

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints;

// ************ Get User Details ************
// This function is used to get the details of a user
export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      });

      //  Set the user details in the redux store after getting the user details from the API
      dispatch(setUser({ ...response.data.userDetails }));
      dispatch(setLoading(false));
    } catch (error) {
      console.log("ERROR while getting user details", error);
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
      // If the token is invalid, log out the user and navigate to the login page
      dispatch(logout(navigate));
    }
    dispatch(setLoading(false));
  };
}

// ************ Get Enrolled Courses ************
// This function is used to get the enrolled courses of a user
export async function getEnrolledCourse(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );
    result = response?.data?.data;
    toast.dismiss(toastId);
  } catch (error) {
    console.log("ERROR while getting enrolled courses", error);
    toast.error(error.response.data.message);
    toast.dismiss(toastId);
    return result;
  }

  toast.dismiss(toastId);
  return result;
}

// ************ Get Instructor Data ************
// This function is used to get the details of an instructor

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...");
  let result = [];
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    });
    result = response?.data?.data;
    toast.dismiss(toastId);
  } catch (error) {
    console.log("ERROR while getting instructor data", error);
    toast.error(error.response.data.message);
    toast.dismiss(toastId);
    return result;
  }

  toast.dismiss(toastId);
  return result;
}
