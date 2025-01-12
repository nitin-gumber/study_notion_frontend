import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { apiConnector } from "../../../services/apiConnector";
import CounteryCode from "../../../data/countrycode.json";
import { contactusEndpoint } from "../../../services/apis";
import { setContactData } from "../../../slices/contactSlice";
import { isDisposableEmail } from "../../../util/checkDisposableEmail";

const ContactUsForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Check if email is disposable or not
    if (isDisposableEmail(data.email)) {
      dispatch(setContactData(data));

      if (!token) {
        toast.error("Please login to send message to admin");
        return navigate("/login");
      }
      const toastId = toast.loading("Loading...");
      try {
        setLoading(true);
        const response = await apiConnector(
          "POST",
          contactusEndpoint.CONTACT_US_API,
          data,
          {
            Authorization: `Bearer ${token}`,
          }
        );
        response.data.success && navigate("/message-sent/success");
        toast.success(response.data.message);
        reset();
      } catch (error) {
        console.log("ERROR............", error);
        toast.error(error.response?.data?.message);
      } finally {
        setLoading(false);
        toast.dismiss(toastId);
      }
    } else {
      reset();
      return toast.error("Disposable email addresses are not allowed");
    }
  };

  return (
    // Form to send message to admin
    <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 lg:flex-row ">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="text-[14px] text-richblack-5">
            First Name <sup className="text-yellow-50">*</sup>
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            {...register("firstName", {
              required: true,
              minLength: {
                value: 3,
                message: "First Name should be atleast 3 characters",
              },
              maxLength: {
                value: 20,
                message: "First Name should not exceed 20 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "First Name should contain only alphabets",
              },
            })}
            placeholder="Enter your first name"
            value={token && (user?.firstName ? user.firstName : "Loading")}
            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          />
          {errors.firstname && (
            <span className="text-[12px] text-yellow-100">
              {errors.firstname.message}
            </span>
          )}
        </div>

        {/* last name */}
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="text-[14px] text-richblack-5">
            Last Name <sup className="text-yellow-50">*</sup>
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            {...register("lastName", {
              required: true,
              minLength: {
                value: 3,
                message: "Last Name should be atleast 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Last Name should not exceed 20 characters",
              },
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Last Name should contain only alphabets",
              },
            })}
            placeholder="Enter your last name"
            value={token && (user?.lastName ? user?.lastName : "Loading")}
            className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
          />
          {errors.lastName && (
            <span className="text-[12px] text-yellow-100">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-[14px] text-richblack-5">
          Email Address <sup className="text-yellow-50">*</sup>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          })}
          placeholder="Enter your email address"
          value={token && (user?.email ? user?.email : "Loading" )}
          className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
        />
        {errors.email && (
          <span className="text-[12px] text-yellow-100">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="text-[14px] text-richblack-5">
          Phone Number <sup className="text-yellow-50">*</sup>
        </label>

        <div className="flex gap-5">
          <div className="flex w-[80px] flex-col gap-2">
            <select
              name="countryCode"
              id="countryCode"
              {...register("countryCode", {
                required: true,
              })}
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            >
              {CounteryCode.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.code} -{country.country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              {...register("phoneNumber", {
                required: true,
                pattern: {
                  value: /^[0-9]{10}$/i,
                  message: "Invalid phone number",
                },
              })}
              placeholder="Enter your phone number"
              className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
            />
          </div>
        </div>
        {errors.phoneNumber && (
          <span className="text-[12px] text-yellow-100">
            {errors.phoneNumber.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-[14px] text-richblack-5">
          Message <sup className="text-yellow-50">*</sup>
        </label>
        <textarea
          name="message"
          id="message"
          {...register("message", {
            required: true,
            minLength: {
              value: 20,
              message: "Message should be atleast 20 characters",
            },
            maxLength: {
              value: 500,
              message: "Message should not exceed 500 characters",
            },
          })}
          placeholder="Enter your message"
          className="rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none focus:border-yellow-50 focus:ring-1 focus:ring-yellow-50"
        ></textarea>
        {errors.message && (
          <span className="text-[12px] text-yellow-100">
            {errors.message.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px]`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default ContactUsForm;
