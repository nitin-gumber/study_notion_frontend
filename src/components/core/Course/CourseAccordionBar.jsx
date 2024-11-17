import { useRef, useMemo } from "react";
import { AiOutlineDown } from "react-icons/ai";
import CourseSubSectionAccordion from "./CourseSubSectionAccordion";

const CourseAccordionBar = ({ course, isActive, handleActive }) => {
  const contentEl = useRef(null);

  // Determine if the current accordion section is active
  const isActiveSection = useMemo(
    () => isActive.includes(course._id),
    [isActive, course._id]
  );

  // Adjust section height based on the active state
  const sectionHeight = useMemo(() => {
    return isActiveSection && contentEl.current
      ? contentEl.current.scrollHeight
      : 0;
  }, [isActiveSection]);

  return (
    <>
      <div className="overflow-hidden border border-solid border-richblack-600 bg-richblack-700 text-richblack-5 last:mb-0 mb-3">
        <div>
          <div
            className={`flex cursor-pointer items-start justify-between bg-opacity-20 px-7 py-6 transition-[0.3s] duration-[0.35s]`}
            onClick={() => handleActive(course._id)}
          >
            <div className="flex items-center gap-2">
              <AiOutlineDown
                className={`transition-transform duration-300 ${
                  isActiveSection ? "rotate-180" : "rotate-0"
                }`}
              />
              <p>{course?.sectionName}</p>
            </div>
            <div className="space-x-4">
              <span className="text-yellow-25">{`${
                course?.subSection?.length || 0
              } lecture(s)`}</span>
            </div>
          </div>
        </div>
        <div
          ref={contentEl}
          className={`relative h-0 overflow-hidden bg-richblack-900 transition-[0.3s] duration-[0.35s] ease-in-out`}
          style={{
            height: sectionHeight,
          }}
        >
          <div className="text-textHead flex flex-col gap-2 px-7 py-6 font-semibold">
            {course?.subSection?.map((subSec) => (
              <CourseSubSectionAccordion subSec={subSec} key={subSec._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseAccordionBar;
