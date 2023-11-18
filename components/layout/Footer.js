import React from "react";
import { Link as LinkScroll } from "react-scroll";
import logo from "../asset/logo.png";
import Image from "next/image";
// import Twitter from "../../public/assets/Icon/twitter.svg";
import Twitter from "../../components/asset/twitter-x.png";
import Linkedin from "../../public/assets/Icon/linkedin.svg";
import Youtube from "../../public/assets/Icon/youtube.svg";
import Instagram from "../../public/assets/Icon/instagram.svg";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-white-300 pt-24 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-3 sm:grid-rows-1 grid-flow-row sm:grid-flow-col gridcenter gap-4">
        <div className="row-span-2 place-items-center sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col  ">
          <Image
            height={150}
            width={150}
            src={logo}
            className=" w-100 h-50 mb-2"
          />

          {/* <p className="mb-4 none text-center">
            <strong className="font-medium"> With Estuary,</strong> you pay zero
            marketplace fees so you get the best prices on the market!
          </p> */}
          <div className="flex w-full mt-2 mb-8 -mx-2 justify-center">
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Link href="https://www.twitter.com/estuaryshoes">
                <Image src={Twitter} className="h-6 w-6" />
              </Link>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Link href="https://www.youtube.com/@estuaryshoes">
                <Youtube className="h-6 w-6" />
              </Link>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Link href="https://www.instagram.com/estuaryshoes/">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Link href="https://www.linkedin.com/company/estuaryshoes/about/">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="flex flex-row mb-4" style={{ gap: "20px" }}>
            <Link href="/terms/termofservice">
              <p className="text-gray-400 text-center">Terms of Service</p>
            </Link>
            <Link href="/terms/privacy">
              <p className="text-gray-400 text-center">Privacy Policy</p>
            </Link>
          </div>
          <p className="text-gray-400 text-center">
            ©{new Date().getFullYear()} - The Estuary Group LLC. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
