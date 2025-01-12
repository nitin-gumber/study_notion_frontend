import React from "react";
import Lottie from "lottie-react";
import successAnimationData from "../assets/Animation - 1727627516570.json"; // Lottie animation JSON file
import { Helmet } from "react-helmet-async";

const MessageSuccessPage = () => {
  return (
    <>
      <Helmet>
        <title>StudyNotion - Message Sent</title>
        <meta
          name="description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          name="keywords"
          content="StudyNotion, StudyNotionLogin, login online learning, coding, design, courses, industry experts"
        />
      </Helmet>

      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="mb-4">
          <Lottie
            animationData={successAnimationData}
            loop={false}
            autoplay={true}
            style={{ height: 150, width: 150 }}
          />
        </div>
        <h2 className="text-3xl font-bold text-richblack-5">Thank you!</h2>
        <p className="text-xl text-richblack-50">
          Your message has been sent successfully.
        </p>
      </div>
    </>
  );
};

export default MessageSuccessPage;
