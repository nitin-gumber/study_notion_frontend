import { createSlice } from "@reduxjs/toolkit";


const courseCategoriesSlice = createSlice({
  name: "courseCategories",
  initialState: {
    courseCategories: [], // Initial state is an empty array
    loading: false,
  },
  reducers: {
    setCourseCategories: (state, action) => {
      state.courseCategories = action.payload; // Update state with new course categories
    },
  },
});

// Export the action creator
export const { setCourseCategories } = courseCategoriesSlice.actions;

// Export the reducer to be used in the store
export default courseCategoriesSlice.reducer;
