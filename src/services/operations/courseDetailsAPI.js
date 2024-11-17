import { toast } from "react-hot-toast";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import { apiConnector } from "../apiConnector";
import { courseEndpoints } from "../apis";

const {
  CREATE_COURSE_API,
  CREATE_SECTION_API,
  COURSE_DETAILS_API,
  UPDATE_SECTION_API,
  UPDATE_SUBSECTION_API,
  CREATE_SUBSECTION_API,
  EDIT_COURSE_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  DELETE_COURSE_API,
  GET_ALL_INSTRUCTOR_COURSES_API,
  GET_FULL_COURSE_DETAILS_AUTHENTICATED,
  CREATE_RATING_API,
  LECTURE_COMPLETION_API,
} = courseEndpoints;

// ************************ Fetch Course Details API ************************
// This function sends a POST request to the server to fetch the details of the course with the given courseId.
export const fetchCourseDetails = async (courseId) => {
  // const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, {
      courseId,
    });
    console.log("COURSE_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response.data;
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error);
    result = error.response.data;
    toast.error(error.response.data.message);
  }
  // toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result;
};

// ************************ Create Course API ************************
// This function sends a POST request to the server to create a new course with the given details.
export const addCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("Create Course API Response: ", response);

    toast.success(response.data.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Create Course API Error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Edit Course API ************************
// This function sends a POST request to the server to edit the course with the given details.
export const editCourseDetails = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Create Section API ************************
// This function sends a POST request to the server to create a new section with the given details.
export const createSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Create Section API Response: ", response);

    toast.success(response.data.message);
    result = response?.data?.updatedCourse;
  } catch (error) {
    console.log("Create Section API Error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Create SubSection API ************************
// This function sends a POST request to the server to create a new subsection with the given details.
export const createSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Create SubSection API Response: ", response);

    toast.success(response.data.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Create SubSection API Error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Update Section API ************************
// update a section
export const updateSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("UPDATE SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Section");
    }
    toast.success("Course Section Updated");
    result = response?.data?.data;
  } catch (error) {
    console.log("UPDATE SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Update SubSection API ************************
// This function sends a POST request to the server to update the subsection name with the given details.
export const updateSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Update SubSection API Response: ", response);

    toast.success(response.data.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Update SubSection API Error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Delete Section API ************************
// This function sends a DELETE request to the server to delete the section with the given details.
export const deleteSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Delete Section API Response: ", response);

    toast.success(response.data.message);
    result = response?.data?.data;
  } catch (error) {
    console.log("Delete Section API Error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Delete SubSection API ************************
// This function sends a DELETE request to the server to delete the subsection with the given details.
// delete a subsection
export const deleteSubSection = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    console.log("DELETE SUB-SECTION API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture");
    }
    toast.success("Lecture Deleted");
    result = response?.data?.data;
  } catch (error) {
    console.log("DELETE SUB-SECTION API ERROR............", error);
    toast.error(error.message);
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Fetch Instructor Courses API ************************
// This function sends a GET request to the server to fetch all the courses of the instructor.
export const fetchInstructorCourses = async (token) => {
  let result = null;

  try {
    const response = await apiConnector(
      "GET",
      GET_ALL_INSTRUCTOR_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    console.log("Fetch Instructor Courses API Response: ", response);

    result = response?.data?.data;
  } catch (error) {
    console.log("Fetch Instructor Courses API Error: ", error);
    toast.error(error?.response?.data?.message);
  }

  return result;
};

// ************************ Delete Course API ************************
// This function sends a DELETE request to the server to delete the course with the given details.
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("Delete Course API Response: ", response);
    toast.success(response.data.message);
  } catch (error) {
    console.log("Delete Course API Error: ", error);
    toast.error(error?.response?.data?.message);
  }
  toast.dismiss(toastId);
};

// ************************ Get Full Details of Course API ************************
// This function sends a POST request to the server to fetch the full details of the course.
export const getFullDetailsOfCourse = async (courseId, token) => {
  const toastId = toast.loading("Loading...");
  //   dispatch(setLoading(true));
  let result = null;
  try {
    const response = await apiConnector(
      "POST",
      GET_FULL_COURSE_DETAILS_AUTHENTICATED,
      {
        courseId,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    result = response?.data?.data;

    console.log("COURSE_FULL_DETAILS_API API RESPONSE............", result);
  } catch (error) {
    console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
    result = error.response.data;
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  //   dispatch(setLoading(false));
  return result;
};

// ************************ Mark Lecture as Completed API ************************
// This function sends a POST request to the server to mark the lecture as completed.
export const markLectureAsComplete = async (data, token) => {
  let result = null;
  console.log("mark complete data", data);
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
      Authorization: `Bearer ${token}`,
    });
    toast.success(response.data.message);
    result = true;
  } catch (error) {
    console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
    toast.error(error?.response?.data?.message);
    result = false;
  }
  toast.dismiss(toastId);
  return result;
};

// ************************ Create Rating API ************************
// This function sends a POST request to the server to create a new rating with the given details.
// create a rating for course
export const createRating = async (data, token) => {
  const toastId = toast.loading("Loading...")
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE RATING API RESPONSE............", response)
    toast.success(response.data.message)
    success = true
  } catch (error) {
    success = false
    console.log("CREATE RATING API ERROR............", error)
    toast.error(error.response.data.message)
  }
  toast.dismiss(toastId)
  return success
}