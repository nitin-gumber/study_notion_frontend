import { FcGoogle } from "react-icons/fc";
import FrameImg from "../../../assets/Images/frame.png";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ title, desc1, desc2, image, formType }) => {
  return (
    <>
      <div className="lg:flex lg:justify-between lg:flex-row w-11/12 max-w-[1160px] gap-y-0 mt-12 mx-auto">
        <div className="w-11/12 max-w-[450px] mx-auto">
          <h2 className=" text-richblack-5 font-semibold font-inter text-[1.875rem] leading-[2.375rem]">
            {title}
          </h2>
          <p className=" text-[1.125rem] leading-[1.627rem] font-inter mt-4">
            <span className=" text-richblack-100 block">{desc1}</span>
            <span className=" text-blue-100 italic">{desc2}</span>
          </p>

          {formType === "signup" ? <SignupForm /> : <LoginForm />}
          <div className=" flex w-full items-center my-4 gap-x-2">
            <div className="h-[1px] w-full bg-richblack-700"></div>
            <p className=" text-richblack-700 font-medium leading-[1.375rem]">
              OR
            </p>
            <div className="h-[1px] w-full bg-richblack-700"></div>
          </div>

          <button className="flex items-center w-full justify-center rounded-[8px] font-medium text-richblack-100 border border-richblack-700 px-[12px] py-[8px] gap-x-2 my-6 font-inter">
            <FcGoogle />
            <p>Sign in with Google</p>
          </button>
        </div>

        <div className=" hidden lg:block relative w-11/12 max-w-[450px]">
          <img
            src={FrameImg}
            alt="Pattern"
            width={558}
            height={504}
            loading="lazy"
          />

          <img
            src={image}
            alt="StudentImg"
            width={558}
            height={504}
            loading="lazy"
            className=" absolute -top-4 right-4 "
          />
        </div>
      </div>
    </>
  );
};

export default Template;
