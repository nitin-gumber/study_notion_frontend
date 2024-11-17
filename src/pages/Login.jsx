import Template from "../components/core/Auth/Template";
import loginImg from "../assets/Images/login.webp";
import { Helmet } from "react-helmet-async";

const Login = () => {
  return (
    <>

      <Helmet>

        <title>StudyNotion - Login</title>
        <meta
          name="description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          name="keywords"
          content="StudyNotion, StudyNotionLogin, login online learning, coding, design, courses, industry experts"
        />

        <meta property="og:title" content="StudyNotion - Login" />
        <meta
          property="og:description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta property="og:image" content="https://www.example.com/image.jpg" />
        <meta property="og:url" content="https://www.example.com" />
        <meta property="og:type" content="website" />

      </Helmet>

      <div className="mt-16">
        <Template
          title="Welcome Back"
          desc1="Build skills for today, tormorrow, and beyound."
          desc2="Education to future-proof your career."
          image={loginImg}
          formType="login"
        />
      </div>
    </>
  );
};

export default Login;
