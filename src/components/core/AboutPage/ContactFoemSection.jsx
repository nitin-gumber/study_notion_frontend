import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";

const ContactFoemSection = () => {
  return (
    <>
      <div className="mx-auto">
        <h2 className="text-center text-4xl font-semibold">Get in Touch</h2>
        <p className="text-center text-richblack-300 mt-3">
          We&apos;d love to here for you, Please fill out this form.
        </p>
        <div className="mt-12 mx-auto">
          <ContactUsForm />
        </div>
      </div>
    </>
  );
};

export default ContactFoemSection;
