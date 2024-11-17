import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiSkipNextCircle, BiSkipPreviousCircle } from "react-icons/bi";
import { MdOutlineReplay } from "react-icons/md";
import IconBtn from "../../common/IconButton";
import { useLocation } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const location = useLocation();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { courseSectionData, completedLectures } = useSelector(
    (state) => state.viewCourse
  );

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch the current video data based on course, section, and subsection IDs
  useEffect(() => {
    // Fetch the course data if it is not available
    if (!courseSectionData.length) return;

    // Find the current video data based on the section and subsection IDs from the course data
    const filteredData = courseSectionData.find(
      // why find? why not filter? ==> find returns the first element that satisfies the condition in the callback function and filter returns an array of elements that satisfy the condition in the callback function
      (data) => data._id === sectionId
    );

    // Find the current video data based on the subsection ID from the filtered data above and set it to the state
    const filteredVideoData = filteredData?.subSection.find(
      (data) => data._id === subSectionId
    );
    // Set the video data to the state
    setVideoData(filteredVideoData || null);
    setVideoEnded(false);
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  // Check if the current video is the first one in the course
  const isFirstVideo = () => {
    // Find the index of the current section in the course data
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    // Find the index of the current subsection in the current section
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    // Check if the current video is the first one in the course
    return currentSectionIndex === 0 && currentSubSectionIndex === 0;
  };

  // Check if the current video is the last one in the course
  const isLastVideo = () => {
    // Find the index of the current section in the course data
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    // Find the number of subsections in the current section to check if the current video is the last one
    const noOfSubsections =
      courseSectionData[currentSectionIndex]?.subSection.length || 0;

    // Find the index of the current subsection in the current section to check if the current video is the last one
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    // Check if the current video is the last one in the course based on the section and subsection indexes in the course data
    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Navigate to the next video in the course
  const goToNextVideo = () => {
    // Find the index of the current section in the course data to check if the current video is the last one
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    // Find the number of subsections in the current section to check if the current video is the last one
    const noOfSubsections =
      courseSectionData[currentSectionIndex]?.subSection.length || 0;

    // Find the index of the current subsection in the current section to check if the current video is the last one
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    // Navigate to the next video if the current video is not the last one in the course based on the section and subsection indexes in the course data
    if (currentSubSectionIndex !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // Navigate to the next section if the current section is the last one
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;

      // Find the first subsection in the next section to navigate to the next video in the next section
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // Navigate to the previous video in the course
  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ]?.subSection.findIndex((data) => data._id === subSectionId);

    // Navigate to the previous video if the current video is not the first one in the course based on the section and subsection indexes in the course data
    if (currentSubSectionIndex !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // Navigate to the previous section if the current section is the first one in the course
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  // Mark the current lecture as completed
  const handleLectureCompletion = async () => {
    setLoading(true);
    const response = await markLectureAsComplete(
      {
        courseId: courseId,
        subSectionId: subSectionId,
      },
      token
    );

    if (response) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  // Replay the video from the beginning
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setVideoEnded(false);
    }
  };

  return (
    <div className="md:w-[calc(100vw-320px)] w-screen p-3 relative">
      {!videoData ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div>
          <video
            ref={videoRef}
            src={videoData.videoUrl}
            controls
            onEnded={() => setVideoEnded(true)}
            className="w-full"
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
          />

          {videoEnded && (
            <>
              <div className=" absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                    customClasses="text-xs md:text-lg max-w-max px-4 mx-auto"
                  />
                )}
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-x-28">
                <MdOutlineReplay
                  onClick={handleReplay}
                  className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 text-white p-[0.10rem]"
                />

                {!isFirstVideo() && (
                  <BiSkipPreviousCircle
                    onClick={goToPrevVideo}
                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 text-white p-[0.10rem] -order-1"
                  />
                )}
                {!isLastVideo() && (
                  <BiSkipNextCircle
                    onClick={goToNextVideo}
                    className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 text-white p-[0.10rem]"
                  />
                )}
              </div>
            </>
          )}
          {/* Video title and description */}
          <div className="mt-5">
            <h2 className="text-2xl font-bold text-richblack-25">
              {videoData?.title}
            </h2>
            <p className="text-gray-500 text-richblack-100">
              {videoData?.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
