import React, { useState } from "react";

const ChatWithAI = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`Notification request received for: ${email}`);
  };

  return (
    <>
      <div className="grid place-content-center h-screen">
        <div className="flex flex-col gap-7 items-center text-white">
          <h2 className="text-6xl font-bold text-transparent ">
            <span className="bg-clip-text bg-gradient-to-r from-caribbeangreen-200 via-blue-200  to-blue-500">
              Coming
            </span>{" "}
            <span className="bg-clip-text bg-gradient-to-r from-blue-500 via-yellow-300  to-pink-300">
              Soon
            </span>
          </h2>
          <p className=" text-base md:text-lg text-gray-400 text-center px-2">
            We are working hard to bring you the best AI experience.
            <br />
            Stay tuned and subscribe to get notified when we launch.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-center">
              <input
                type="email"
                placeholder="Please enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-4 rounded-l-md bg-richblack-700 text-white focus:outline-none w-72"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white text-black rounded-r-md focus:outline-none"
              >
                Notify Me
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Notify me when the AI chatbot is ready to use.
          </p>
        </div>
      </div>
    </>
  );
};

export default ChatWithAI;
