import React from "react";
import * as Icon1 from "react-icons/hi2";
import * as Icon2 from "react-icons/bi";
import * as Icon3 from "react-icons/io5";

const ContactDetails = () => {
  const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Contact us",
      description: "Our team is here to help.",
      details: "studynotiononline@gmail.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details: "Action Area III Newtown, Kolkata, West Bengal, India",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri: 9:00 AM - 7:00 PM",
      details: "+91 1234567890",
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
        {contactDetails.map((contactDetail, index) => {
          let Icon =
            Icon1[contactDetail.icon] ||
            Icon2[contactDetail.icon] ||
            Icon3[contactDetail.icon];

          return (
            <div
              className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
              key={index}
            >
              <div className="flex flex-row items-center gap-3">
                <Icon size={25} />
                <h2 className="text-lg font-semibold text-richblack-5">
                  {contactDetail.heading}
                </h2>
              </div>
              <p className="font-medium">{contactDetail.description}</p>
              <p className="font-semibold">{contactDetail.details}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContactDetails;
