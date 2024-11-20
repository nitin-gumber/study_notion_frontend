import Template from "../components/core/Auth/Template";
import signupImg from "../assets/Images/signup.webp";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";

const StudentSignup = () => {
  const { loading } = useSelector((state) => state.auth);

  return (
    <>
      <Helmet>
        <title>StudyNotion - Signup</title>
        <meta
          name="description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          name="keywords"
          content="StudyNotion, StudyNotionSignup, signup online learning, coding, design, courses, industry experts"
        />

        <meta property="og:title" content="StudyNotion - Signup" />
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
          content="https://studynotion-online.vercel.app/signup"
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
            image={signupImg}
            formType="studentSignup"
          />
        </div>
      )}
    </>
  );
};

export default StudentSignup;
