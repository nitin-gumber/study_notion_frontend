import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import { useSelector } from "react-redux";

const MenuBar = ({
  subLinks,
  matchRoute,
  NavbarLinks,
  setOpen,
  isOpen,
  isLoading,
  isError,
  error,
}) => {
  const { token } = useSelector((state) => state.auth);

  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  // Function to handle navigation and close the menu
  const handleNavClick = (path) => {
    setOpen(false); // Close the menu bar after click
  };

  return (
    <div
      className={`fixed top-0 right-0 -z-10 h-screen w-screen bg-richblack-900 transition-all duration-500 ease-in-out transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {isOpen && (
        <div className="bg-richblack-900 w-11/12 max-w-maxContent p-6 rounded-lg">
          <nav
            onClick={(e) => e.stopPropagation()}
            className="text-white text-xl mt-20 flex justify-start items-center ml-10"
          >
            <ul className="flex flex-col gap-10">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative">
                      <p
                        onClick={toggleCategories}
                        className="text-richblack-25 cursor-pointer flex items-center gap-1"
                      >
                        {link.title}
                        <FaAngleDown
                          className={`text-[15px] transition-transform duration-300 ease-in-out ${
                            showCategories && "rotate-180"
                          }`}
                        />
                      </p>
                      <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                          showCategories
                            ? "max-h-[500px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="mt-2 flex flex-col gap-2">
                          {isLoading ? (
                            <p>Loading...</p>
                          ) : isError ? (
                            <p>Something went wrong! {error.message}</p>
                          ) : subLinks.length ? (
                            <>
                              {subLinks?.map((subLink, index) => (
                                <Link
                                  to={`/catalog/${subLink?.name
                                    .toString()
                                    .toLowerCase()
                                    .trim()
                                    .replace(/\s+/g, "-")
                                    .replace(/[^\w\-]+/g, "")
                                    .replace(/\-\-+/g, "-")}`}
                                  onClick={() => {
                                    toggleCategories();
                                    handleNavClick();
                                  }}
                                  key={index}
                                >
                                  <li className="bg-transparent p-2 hover:bg-richblack-800 rounded-md cursor-pointer transition-all duration-200 ease-in-out">
                                    <p className="text-richblack-5 whitespace-nowrap text-[17px]">
                                      {subLink?.name}
                                    </p>
                                  </li>
                                </Link>
                              ))}
                            </>
                          ) : (
                            <p className="text-richblack-900 text-[17px] font-semibold">
                              No Data Found
                            </p>
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        onClick={() => handleNavClick(link?.path)}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}

              {/* Login / Signup buttons */}
              <div className="flex gap-x-5 items-center">
                {token === null && (
                  <Link to="/login">
                    <button
                      className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
                      onClick={() => setOpen(false)}
                    >
                      Login
                    </button>
                  </Link>
                )}

                {token === null && (
                  <Link to="/signup">
                    <button
                      className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]"
                      onClick={() => setOpen(false)}
                    >
                      Signup
                    </button>
                  </Link>
                )}
              </div>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
