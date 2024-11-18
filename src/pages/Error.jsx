import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <>
      <section className="py-10 bg-white h-screen">
        <div className="mx-auto">
          <div className="flex justify-center mt-10">
            <div className="text-center">
              <div
                className="bg-center bg-no-repeat bg-cover h-96"
                style={{
                  backgroundImage: `url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)`,
                }}
              >
                <h2 className="text-8xl text-richblack-800 text-center">404</h2>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl md:text-4xl text-richblack-800 font-semibold">
                  Look like you're lost
                </h3>

                <p className="text-lg text-richblack-800 mt-2">
                  The page you are looking for is not available!
                </p>

                <Link
                  to="/"
                  className="inline-block mt-6 px-5 py-2 bg-green-600 text-richblue-900 font-bold rounded transition duration-200 bg-yellow-100 hover:bg-yellow-200"
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
