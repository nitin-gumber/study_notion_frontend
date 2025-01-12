import "./App.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet-async";

// components
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import AddCourse from "./components/core/Dashboard/AddCourse";
import Cart from "./components/core/Dashboard/Cart";
import EditCourse from "./components/core/Dashboard/EditCourse";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import MyCourses from "./components/core/Dashboard/MyCourse";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ForgetPassword from "./pages/ForgetPassword";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import StudentSignup from "./pages/StudentSignup";
import InstructorSignup from "./pages/InstructorSignup";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Catalog from "./pages/Catalog";
import ViewCourse from "./pages/ViewCourse";
import { getUserDetails } from "./services/operations/ProfileAPI";
import { ACCOUNT_TYPE } from "./util/constant";
import MessageSuccessPage from "./pages/MessageSuccessPage";
import Error from "./pages/Error";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  // AOS - Animate on Scroll
  Aos.init(
    { once: true },
    { duration: 1000 },
    { easing: "ease-in-out" },
    { offset: 100 },
    { delay: 100 }
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { contactData } = useSelector((state) => state.contactData);

  // Get User Details from the token
  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
        <Navbar />
        <Routes>
          {/* Add comments */}

          {/* Home path */}
          <Route path="/" element={<Home />} />

          {/* About path */}
          <Route path="/about" element={<About />} />

          {/* Contact message success path */}
          {contactData && (
            <Route
              path="/message-sent/success"
              element={<MessageSuccessPage />}
            />
          )}

          {/* Contact path */}
          <Route path="/contact" element={<Contact />} />

          {/* Catalog path */}
          <Route path="catalog/:catalogName" element={<Catalog />} />

          {/* Course Details path */}
          <Route path="courses/:courseId" element={<CourseDetails />} />

          {/* Open Rotes - for only Non Logged in User */}
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgetPassword />
              </OpenRoute>
            }
          />

          <Route
            path="/update-password/:id"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          {/* Signup for Student */}
          <Route
            path="/signup"
            element={
              <OpenRoute>
                <StudentSignup />
              </OpenRoute>
            }
          />

          {/* Signup for Instructor */}
          <Route
            path="/create-instructor-account"
            element={
              <OpenRoute>
                <InstructorSignup />
              </OpenRoute>
            }
          />

          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          />

          {/* Private Routes - for only Logged in User */}
          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            {/* Routes for all Users */}
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Settings />} />

            {/* Only for Student */}
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="dashboard/enrolled-courses"
                  element={<EnrolledCourses />}
                />
                <Route path="dashboard/cart" element={<Cart />} />
              </>
            )}

            {/* Only for Instructor */}
            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="dashboard/instructor" element={<Instructor />} />
                <Route path="dashboard/my-courses" element={<MyCourses />} />
                <Route path="dashboard/add-course" element={<AddCourse />} />
                <Route
                  path="dashboard/edit-course/:courseId"
                  element={<EditCourse />}
                />
              </>
            )}
          </Route>

          {/* For the Watching Course lecture */}
          <Route
            element={
              <PrivateRoute>
                <ViewCourse />
              </PrivateRoute>
            }
          >
            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route
                  path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                  element={<VideoDetails />}
                />
              </>
            )}
          </Route>

          {/* Error Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
