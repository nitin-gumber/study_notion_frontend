import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getInstructorData } from "../../../../services/operations/ProfileAPI";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { InstructorChart } from "./InstructorChart";

const Instructor = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const [currentChart, setCurrentChart] = useState("revenue");

  const { data: instructorData } = useQuery({
    queryKey: ["instructorData", token],
    queryFn: () => getInstructorData(token),
  });

  const { data: courses } = useQuery({
    queryKey: ["courses", token],
    queryFn: () => fetchInstructorCourses(token),
  });

  const totalEarnings = useMemo(() => {
    if (instructorData) {
      return instructorData.reduce(
        (acc, course) => acc + course.totalRevenue,
        0
      );
    }
    return 0;
  }, [instructorData]);

  const totalStudents = useMemo(() => {
    if (instructorData) {
      return instructorData.reduce(
        (acc, course) => acc + course.totalStudents,
        0
      );
    }
    return 0;
  }, [instructorData]);

  return (
    <>
      <div className="mx-auto w-11/12 max-w-[1000px] py-10">
        <div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-richblack-5">
              Hi {user?.firstName} 👋
            </h1>
            <p className="font-medium text-richblack-200">
              Let's start something new
            </p>
          </div>
          <div className="my-4 flex flex-col-reverse  gap-3 md:flex-row md:flex md:h-[450px] md:space-x-4">
            <div className="flex flex-col flex-1 rounded-md bg-richblack-800 p-6">
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setCurrentChart("revenue")}
                    className={`px-2 py-2 rounded-md ${
                      currentChart === "revenue"
                        ? "bg-richblack-900 text-yellow-100"
                        : "bg-richblack-800 text-richblack-100"
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => setCurrentChart("students")}
                    className={`px-2 py-2 rounded-md ${
                      currentChart === "students"
                        ? "bg-richblack-900 text-yellow-100"
                        : "bg-richblack-800 text-richblack-100"
                    }`}
                  >
                    Students
                  </button>
                </div>
              </div>
              {/* Generate pie Chart */}
              <InstructorChart
                details={instructorData}
                currentChart={currentChart}
              />
            </div>
            <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {courses?.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Earnings</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    ₹ {totalEarnings}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md bg-richblack-800 p-6">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold text-richblack-5">Your Courses</p>
            <Link
              to={"/dashboard/my-courses"}
              className="text-xs font-semibold text-yellow-50"
            >
              View all
            </Link>
          </div>
          <div className="my-4 flex space-x-6">
            {courses?.length === 0 ? (
              <p className="text-sm font-medium text-richblack-300">
                You have not created any courses yet
              </p>
            ) : (
              courses?.slice(0, 3)?.map((course, index) => {
                return (
                  <div key={index} className="w-1/3">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      loading="lazy"
                      className=" aspect-video md:h-[201px] w-full rounded-md object-fit"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                       {
                        course?.courseName.split(" ").length > 1
                          ? course.courseName.split(" ").slice(0, 1).join(" ") + "..."
                          : course.courseName 
                       }
                      </p>
                      <div className="mt-1  md:space-x-2 md:flex">
                        <p className="text-xs font-medium text-richblack-300">
                          {course?.studentsEnrolled?.length} Students
                        </p>
                        <p className="hidden md:block text-xs font-medium text-richblack-300">
                          |
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          ₹ {course?.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Instructor;
