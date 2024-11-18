import { useEffect, useState } from "react";
import { VscAdd } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import IconBtn from "../../common/IconButton";
import CoursesTable from "./AddCourse/InstructorCourses/CoursesTable";

const MyCourse = () => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);

  const { data } = useQuery({
    queryKey: ["instructorCourses", token],
    queryFn: () => fetchInstructorCourses(token),
    onSuccess: (data) => {
      setCourses(data);
    },
  });

  useEffect(
    () => {
      if (data) {
        setCourses(data);
      }
    },
    [data],
    [courses]
  );

  return (
    <>
      <div className="mb-14 flex items-center justify-between">
        <h2 className="text-3xl font-medium text-richblack-5">My Courses</h2>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </>
  );
};

export default MyCourse;
