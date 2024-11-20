import Template from "../components/core/Auth/Template";
import InstructorImg from "../assets/Images/InstructorSignup.png";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const InstructorSignup = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      <Helmet>
        <title>StudyNotion - Instructor Signup</title>
        <meta
          name="description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          name="keywords"
          content="StudyNotion, StudyNotionSignup, instructor signup online learning, coding, design, courses, industry experts, add courses"
        />

        <meta property="og:title" content="StudyNotion - Instructor Signup" />
        <meta
          property="og:description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          property="og:image"
          content="../assets/Logo/Logo-Full-Light.png"
        />
        <meta
          property="og:url"
          content="https://studynotion-online.vercel.app/create-instructor-account"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="mt-16">
          <Template
            title="Welcome Back"
            desc1="Build skills for today, tormorrow, and beyound."
            desc2="Education to future-proof your career."
            image={InstructorImg}
            formType="instructorSignup"
          />
        </div>
        
      )}
    </>
  );
};

export default InstructorSignup;
