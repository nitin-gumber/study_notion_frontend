import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  setCompletedLectures,
  setCourseSectionData,
  setCourseEntireData,
  setTotalNoOfLecture,
} from "../slices/viewCourseSlice";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import VideoDetailsSlidebar from "../components/core/ViewCourse/VideoDetailsSlidebar";
import ConfirmationModal from "../components/core/ViewCourse/CourseReviewModal";
function ViewCourse() {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { data: course } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getFullDetailsOfCourse(courseId, token),
    enabled: !!token,
  });

  useEffect(() => {
    if (course) {
      dispatch(setCourseSectionData(course?.courseDetails?.courseContent));
      dispatch(setCourseEntireData(course?.courseDetails));
      dispatch(setCompletedLectures(course.completedVideos));
      var lecture = 0;
      course?.courseDetails?.courseContent?.forEach((section) => {
        lecture += section?.subSection?.length;
      });
      dispatch(setTotalNoOfLecture(lecture));
    }
  }, [courseId, token, course, dispatch]);

  return (
    <>
      <div className="flex w-screen mt-14">
        <VideoDetailsSlidebar setReviewModal={setReviewModal} />

        <div>
          <Outlet />
        </div>
      </div>

      {reviewModal && <ConfirmationModal setReviewModal={setReviewModal} />}
    </>
  );
}

export default ViewCourse;
