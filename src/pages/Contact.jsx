import React from "react";
import ContactDetails from "../components/core/ContactUsPage/ContactDetails";
import ContactForm from "../components/core/ContactUsPage/ContactForm";
import Footer from "../components/common/Footer";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>StudyNotion - Contact Us</title>
        <meta
          name="description"
          content="StudyNotion is an online learning platform that offers courses in coding, design, and more. Learn from industry experts and start coding in seconds."
        />
        <meta
          name="keywords"
          content="StudyNotion, StudyNotionContact, contact online learning, coding, design, courses, industry experts"
        />

        <meta property="og:title" content="StudyNotion - Contact Us" />
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
          content="https://studynotion-online.vercel.app/contact"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row mb-10">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
