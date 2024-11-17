import { createSlice } from "@reduxjs/toolkit";
import { setCourse } from "./courseSlice";

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
};

const viewCourseSlice = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntireData: (state, action) => {
      state.courseEntireData = action.payload;
    },
    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload;
    },
    setTotalNoOfLecture: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload];
    },
  },
});

export const {
    setCourseSectionData,
    setCourseEntireData,
    setCompletedLectures,
    setTotalNoOfLecture,
    updateCompletedLectures

} = viewCourseSlice.actions

export default viewCourseSlice.reducer