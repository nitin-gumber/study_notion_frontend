import React from "react";
import Lottie from "lottie-react"; // Default import for lottie-react
import successAnimationData from "../assets/Animation - 1727627516570.json"; // Lottie animation JSON file
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

  

const MessageSuccessPage = () => {

  const token = useSelector((state) => state.auth);

  console.log("token", token);

  return (
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
  );
};

export default MessageSuccessPage;
