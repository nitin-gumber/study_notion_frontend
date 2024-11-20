import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Logo from "../../assets/Logo/Logo-Full-Light.png";
import { FooterLink2 } from "../../data/footer-links";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
  return (
    <>
      <div className="bg-richblack-800">
        <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
          <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700 ">
            {/* Section 1 */}
            <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r-0 lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
              <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                <img
                  src={Logo}
                  alt="BrandLogo"
                  loading="lazy"
                  className="object-contain"
                />
                <h2 className="text-richblack-50 font-semibold text-[16px]">
                  Company
                </h2>
                <div className="flex flex-col gap-2">
                  {["About", "Careers", "Affiliates"].map((item, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={item.toLowerCase()}>{item}</Link>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 text-lg">
                  <a href="https://github.com/Nitin-Gumber" target="_blank">
                    <FaGithub className=" text-2xl cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nitin-gumber-web-dev"
                    target="_blank"
                  >
                    <FaLinkedin className=" text-2xl cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                  </a>
                  <a
                    href="https://www.instagram.com/nitin.gumber_/profilecard/?igsh=ZnpibmRycjMwZjJq"
                    target="_blank"
                  >
                    <FaInstagram className=" text-2xl cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                  </a>
                  <a
                    href="https://x.com/Nitin601?t=tt1K5tdELxi2F8aeSbxZqg&s=09"
                    target="_blank"
                  >
                    <FaXTwitter className=" text-2xl cursor-pointer hover:text-richblack-50 transition-all duration-200" />
                  </a>
                </div>
                <div></div>
              </div>

              <div className="w-[40%] lg:w-[30%] mb-7 lg:pl-0">
                <h2 className="text-richblack-50 font-semibold text-[16px]">
                  Resources
                </h2>
                <div className="flex flex-col gap-2 mt-2">
                  {Resources.map((item, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={item.toLowerCase()}>{item}</Link>
                    </div>
                  ))}
                </div>

                <h2 className="text-richblack-50 font-semibold text-[16px] mt-7">
                  Support
                </h2>
                <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                  <Link to={"/help-center"}>Help Center</Link>
                </div>
              </div>

              <div className="w-[48%] lg:[30%] mb-7 lg:pl-0">
                <h2 className="text-richblack-50 font-semibold text-[16px]">
                  Plans
                </h2>
                <div className="flex flex-col gap-2 mt-2">
                  {Plans.map((item, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={item.toLowerCase()}>{item}</Link>
                    </div>
                  ))}
                </div>

                <h2 className="text-richblack-50 font-semibold text-[16px] mt-7">
                  Community
                </h2>
                <div className="flex flex-col gap-2 mt-2">
                  {Community.map((item, index) => (
                    <div
                      key={index}
                      className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                    >
                      <Link to={item.toLowerCase()}>{item}</Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
              {FooterLink2.map((item, index) => (
                <div
                  key={index}
                  className="w-[30%] flex flex-col gap-3 mb-7 lg:pl-0"
                >
                  <h2 className="text-richblack-50 font-semibold text-[16px]">
                    {item.title}
                  </h2>
                  <div className="flex flex-col gap-2 mt-2">
                    {item.links.map((link, index) => (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={link.link}>{link.title}</Link>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto pb-14 text-sm">
          {/* Section 1 */}
          <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
            <div className="flex flex-row">
              {BottomFooter.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    BottomFooter.length - 1 === index
                      ? ""
                      : "border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200 border-r"
                  } px-3`}
                >
                  <Link to={item.split(" ").join("-").toLowerCase()}>
                    {item}
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center">
              {`Copyright © ${new Date().getFullYear()} Sorting Study Notion Technologies Pvt Ltd. All Rights Reserved.`}
              <p>Made by Nitin Kumar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
