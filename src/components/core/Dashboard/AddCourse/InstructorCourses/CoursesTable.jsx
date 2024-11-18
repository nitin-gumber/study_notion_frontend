import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useQuery } from "@tanstack/react-query"; // Add useQueryClient
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { COURSE_STATUS } from "../../../../../util/constant";
import { formattedDate } from "../../../../../util/dateFormatter";

import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../../services/operations/courseDetailsAPI";

function CoursesTable({ courses, setCourses }) {
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Fetching the courses using react-query
  const { data, refetch } = useQuery({
    queryKey: ["instructorCourses", token],
    queryFn: () => fetchInstructorCourses(token),
    onSuccess: (data) => {
      setCourses(data);
    },
    enabled: false, // Fetch the courses only when the component is mounted
  });

  // Function to handle course deletion
  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    try {
      // Perform course deletion
      await deleteCourse({ courseId }, token);
      setConfirmationModal(null);

      // Refetch the updated courses after deletion
      await refetch();
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {courses.length === 0 ? (
        <div>
          <h2 className="py-10 text-center text-2xl font-medium text-richblack-100">
            No Courses Found
          </h2>
        </div>
      ) : (
        <Table className="rounded-xl border border-richblack-800">
          <Thead>
            <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2 text-richblack-100">
              <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
                Courses
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Price
              </Th>
              <Th className="text-left text-sm font-medium uppercase text-richblack-100">
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {courses?.map((course) => (
              <Tr
                key={course?._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8 gap-4"
              >
                <Td
                  colSpan={1}
                  className="flex flex-col md:flex-row gap-1 flex-1 gap-x-4 p-3"
                >
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    loading="lazy"
                    className="md:h-[148px] md:w-[220px] aspect-video rounded-lg object-fit"
                  />
                  <div className="flex flex-col gap-1 justify-between">
                    <p className="text-lg font-semibold text-richblack-5 mt-3">
                      {
                      course?.courseName.length > 15
                        ? course.courseName.slice(0, 15) + "..."
                        : course.courseName
                      }

                    </p>
                    <p className={`text-xs text-richblack-300`}>
                      {course?.courseDescription.split(" ")?.length > 5
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, 5)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formattedDate(course.createdAt, "dd MMM yyyy")}{" "}
                      | {new Date(course.createdAt).toLocaleTimeString()}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100 mb-5">
                  ₹ {course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`);
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      });
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}

export default CoursesTable;
