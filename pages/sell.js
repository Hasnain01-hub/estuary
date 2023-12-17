import Layout from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import Image from "next/image";
import change_way from "../components/asset/change-way.jpg";
import sell_popup from "../components/asset/sell-popup.jpg";
import fees_table from "../components/asset/fees_table.png";
import { Link, Element, scroller } from "react-scroll";
import React, { useEffect, useState } from "react";
import customize from "../public/assets/Icon/customize.png";
import SeoHead from "../components/SeoHead";
import list from "../public/assets/Icon/list.png";
import subscribe from "../public/assets/Icon/subscribe.png";

const About = () => {
  const { user } = useSelector((state) => state.user);
  const handleredirect = (e) => {
    e.preventDefault();
    if (user && user.email) {
      window.location.href = `https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID}`;
    } else {
      window.location.href = "/login";
    }
  };
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Function to handle video play
  const handleVideoPlay = () => {
    setVideoPlaying(true);
  };

  // Function to handle video pause
  const handleVideoPause = () => {
    setVideoPlaying(false);
  };

  // useEffect(() => {
  //   if (videoPlaying) {
  //     scroller.scrollTo("videoSection", {
  //       duration: 800,
  //       delay: 0,
  //       smooth: "linear",
  //     });
  //   }
  // }, [videoPlaying]);

  return (
    <>
      <SeoHead title="Sell sneaker" />
      <Layout>
        <div className="py-20 lg:py-24">
          <section className="bg-white dark:bg-gray-900">
            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <Image
                className="w-full dark:hidden rounded-lg shadow-xl"
                src={change_way}
                alt="dashboard image"
              />

              <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Sell Smarter
                </h2>
                <p className="mb-6 font-light text-black-600 md:text-lg dark:text-black-600">
                  Change the way you track, list, and sell online with our new
                  seller inventory tool!
                </p>
                <span
                  //href="/form/addsneaker"
                  onClick={(e) => {
                    handleredirect(e);
                  }}
                  className=" cursor-pointer inline-flex items-center text-white-500 bg-maincolor hover:bg-scolor focus:ring-4 focus:ring-scolor font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
                >
                  Get started
                </span>
              </div>
            </div>
            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  List with Ease
                </h2>
                <p className="mb-6 font-light text-black-600 md:text-lg dark:text-black-600">
                  Listing sneakers has never been easier! Upload your sneakers
                  individually with a few clicks, or in bulk with our import
                  feature.
                </p>
              </div>
              <div className="content">
                <Element name="videoSection" className="video-section">
                  <div
                    className={`video-container ${
                      videoPlaying ? "playing" : ""
                    }`}
                  >
                    <video
                      src={"/videos/list-with-ease.mp4"}
                      autoPlay
                      // controls
                      loop
                      type="video/mp4"
                      muted
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                    />
                  </div>
                </Element>
                <div className="scroll-button">
                  <Link
                    to="videoSection"
                    spy={true}
                    smooth={true}
                    duration={800}
                    offset={-50}
                  ></Link>
                </div>
              </div>
            </div>
            <div className=" inline-flex flex-col-reverse gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <Image
                className="w-full dark:hidden  shadow-xl"
                src={sell_popup}
                style={{
                  boxShadow:
                    "5px 5px 11px 4px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.19)",
                  borderRadius: "5px",
                }}
                alt="dashboard image"
              />

              <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Time the Market
                </h2>
                <p className="mb-6 font-light text-black-600 md:text-lg dark:text-black-600">
                  Decide whether you want to list your inventory, or hide it
                  until the price is right.
                </p>
              </div>
            </div>
            <div className="gap-8 items-center py-8 px-4 mx-auto max-w-screen-xl xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
              <div className="mt-4 md:mt-0">
                <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                  Sell on your Terms
                </h2>
                <p className="mb-6 font-light text-black-600 md:text-lg dark:text-black-600">
                  List your sneakers when the margins are right, and earn a 15%
                  higher payout when you sell your sneakers.
                </p>
              </div>
              <div className="content">
                <Element name="videoSection" className="video-section">
                  <div
                    className={`video-container ${
                      videoPlaying ? "playing" : ""
                    }`}
                  >
                    <video
                      src={"/videos/sell-when-best.mp4"}
                      autoPlay
                      // controls
                      loop
                      type="video/mp4"
                      muted
                      onPlay={handleVideoPlay}
                      onPause={handleVideoPause}
                    />
                  </div>
                </Element>
                <div className="scroll-button">
                  <Link
                    to="videoSection"
                    spy={true}
                    smooth={true}
                    duration={800}
                    offset={-50}
                  ></Link>
                </div>
              </div>
            </div>
          </section>

          <h2 className=" text-center mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Start Selling in 3 Easy Steps
          </h2>
          <div className="aboutrow max-w-screen-xl mx-auto py-10 lg:py-14">
            <div>
              <Image src={subscribe} className="aboutimg" />
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                Subscribe
              </h5>
              <p className="font-para text-gray-700 dark:text-gray-400 para">
                Choose the subscription plan that works best for you!
              </p>
            </div>
            <div>
              <Image
                style={{ width: "120px" }}
                src={customize}
                className="aboutimg"
              />
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                Customize your Profile
              </h5>
              <p className=" font-para text-gray-700 dark:text-gray-400 para">
                Set up your seller profile and pay out method
              </p>
            </div>
            <div>
              <Image src={list} className="aboutimg" />
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                List your Shoes
              </h5>
              <p className="font-para text-gray-700 dark:text-gray-400 para">
                List your sneakers, and we'll take care of the rest
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-center mb-8">
            <span
              //href="/form/addsneaker"
              onClick={(e) => {
                handleredirect(e);
              }}
              className=" cursor-pointer inline-flex items-center text-white-500 bg-maincolor hover:bg-scolor focus:ring-4 focus:ring-scolor font-medium rounded-lg text-2xl px-6 py-3 text-center dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="ml-2 -mr-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
          <div className="mt-5 mb-8">
            <h2 className=" text-center  text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              List more, Pay less
            </h2>
            <p
              style={{ marginBottom: "1rem" }}
              className="font-para  text-gray-700 dark:text-gray-400 para"
            >
              For every 5 sneakers you list, we discount your fee by 0.5%
            </p>
            <Image
              width={350}
              height={410}
              style={{ maxWidth: "80%" }}
              className="dark:hidden rounded-lg shadow-xl mx-auto"
              alt="fees table"
              src={fees_table}
            />
          </div>
          <p
            style={{ color: "#AA0000" }}
            className=" font-para text-center para "
          >
            {" "}
            Disclaimer: At this time we are only selling brand new, or dead
            stock(DS), sneakers
          </p>
        </div>
      </Layout>
    </>
  );
};

export default About;
