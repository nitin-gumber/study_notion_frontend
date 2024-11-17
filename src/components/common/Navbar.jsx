import React, { useState, useEffect, useRef } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Squash as Hamburger } from "hamburger-react";
import { FaAngleDown } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { useQuery } from "@tanstack/react-query";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { setCourseCategories } from "../../slices/courseCategoriesSlice";
import MenuBar from "./MenuBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const node = useRef();

  const { token } = useSelector((state) => state.auth);

  const [isOpen, setOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const {
    data: subLinks = [],
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      dispatch(setCourseCategories(response?.data?.data));
      return response?.data?.data;
    },
  });

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (node.current && !node.current.contains(e.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 fixed top-0 right-0 left-0 bg-richblack-900 z-50">
        <div className="flex w-11/12 max-w-maxContent items-center justify-between mx-3">
          {/* Brand Logo */}
          <Link to="/" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt="brandLogo"
              width={160}
              height={42}
              loading="lazy"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 ring-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative">
                      <p
                        className="text-richblack-25 cursor-pointer flex items-center gap-1"
                        onClick={() => setShowCategories(!showCategories)}
                      >
                        {link.title}{" "}
                        <FaAngleDown
                          className={`text-[15px] transition-all duration-200 ease-linear ${
                            showCategories && "rotate-180"
                          }`}
                        />
                      </p>

                      {/* Toggle visibility of the categories */}
                      {showCategories && (
                        <div
                          ref={node}
                          className="absolute top-7 left-0 bg-white w-[300px] p-4 rounded-lg shadow-sm shadow-richblack-300"
                        >
                          <GoTriangleUp className="absolute top-[-18px] text-[30px] text-white" />
                          <ul className="flex flex-col gap-2">
                            {/* Handling the Data, error, isLoading State */}
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
                                    onClick={() => setShowCategories(false)}
                                    key={index}
                                  >
                                    <li className="bg-richblack-5 p-2 rounded-md hover:bg-richblack-25 cursor-pointer transition-all duration-200 ease-in-out">
                                      <p className="text-richblack-900 whitespace-nowrap text-[17px]">
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
                      )}
                    </div>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                        onClick={() => setShowCategories(false)}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Login/signup/Dashboard */}
          <div className="flex items-center gap-x-5">
            {token === null && (
              <Link to="/login">
                <button className="hidden md:block border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]">
                  Login
                </button>
              </Link>
            )}

            {token === null && (
              <Link to="/signup">
                <button className="hidden md:block border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]">
                  Signup
                </button>
              </Link>
            )}

            {token !== null && <ProfileDropDown setOpen={setOpen} />}
          </div>
        </div>
        {/* for mobile */}
        <div className="md:hidden">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color="white"
            size={28}
            onToggle={() => setOpen(!isOpen)}
          />
          <MenuBar
            subLinks={subLinks}
            matchRoute={matchRoute}
            NavbarLinks={NavbarLinks}
            setOpen={setOpen}
            isOpen={isOpen}
            isError={isError}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
