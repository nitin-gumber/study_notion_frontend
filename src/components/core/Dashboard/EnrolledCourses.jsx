import React from "react";
import { useSelector } from "react-redux";
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getEnrolledCourse } from "../../../services/operations/ProfileAPI";

const EnrolledCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: courses = [] } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getEnrolledCourse(token),
  });

  return (
    <>
      <h2 className="text-3xl text-richblack-50">Enrolled Courses</h2>
      {!courses?.enrolledCourses?.courses ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : !courses?.enrolledCourses?.courses.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not enrolled in any courses yet.
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500">
            <p className="w-[45%] px-5 py-3">Course Name</p>
            <p className="w-1/2 px-2 py-3">Duration</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>

          {courses?.enrolledCourses?.courses.map((course, index, arr) => (
            <div
              className={`flex items-center border border-richblack-700 my-1 md:justify-between ${
                index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={index}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() =>
                  navigate(
                    `/view-course/${course?._id}/section/${course.courseContent[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                  )
                }
              >
                <img
                  src={course.thumbnail}
                  loading="lazy"
                  alt={course.courseName}
                  className="h-20 w-25 rounded-lg object-fit hidden md:block"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold text-[12px]">
                    {course.courseName}
                  </p>
                  <p className="text-xs text-richblack-300">
                    {course.courseDescription.length > 50
                      ? `${course.courseDescription.slice(0, 50)}...`
                      : course.courseDescription}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 p-3">{course?.totalDuration}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {course.progressPercentage || 0}%</p>
                <ProgressBar
                  completed={course.progressPercentage || 0}
                  bgColor="#FFD700"
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default EnrolledCourses;
