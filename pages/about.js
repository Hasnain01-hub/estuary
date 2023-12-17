import Layout from "../components/Layout/Layout";
import Image from "next/image";
import React from "react";
import shoe from "../public/assets/Icon/shoeverified.png";
import SeoHead from "../components/SeoHead";
import abtshoe from "../public/assets/Icon/abtshoe.png";
import AOS from "aos";
import "aos/dist/aos.css";
import money from "../public/assets/Icon/money.png";
import store from "../public/assets/Icon/store.png";
const About = () => {
  React.useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <>
      <SeoHead title="About" />
      <Layout>
        <div className="py-20 lg:py-24">
          <div className="text-center ">
            <h1 className="text-2xl lg:text-3xl xl:text-3xl font-medium text-black-600 leading-normal smpadding">
              <strong>Sneakers you want, prices you deserve</strong>
            </h1>
            <h5 className="mt-4 text-black-600 text-xl sm:text-xl lg:text-xl leading-relaxed font-medium smpadding">
              Our goal is to create more affordable ways to obtain exclusive
              items
            </h5>
          </div>
          <div
            style={{
              // height: "350px",
              maxWidth: "500px",
              width: "auto",
            }}
            className="mx-auto mt-4"
          >
            <video
              className="abt-video mx-auto"
              style={{
                borderRadius: "5px",
              }}
              src={"/videos/about-asset.mp4"}
              // autoPlay
              controls
              loop
              type="video/mp4"
              // onPlay={handleVideoPlay}
              // onPause={handleVideoPause}
            />
          </div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "20px 0px",
            }}
          >
            <iframe
              //   width="420"
              className="frame"
              //   height="345"
              src="https://www.youtube.com/embed/TMpB-n7Sfm8"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              //   allowfullscreen="true"
            ></iframe>
          </div> */}
          <div className=" max-w-screen-xl mx-auto py-4 lg:py-8">
            <div>
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal mb-4">
                Our Story
              </h5>
              <div className="abtstory">
                <div className="abtimage">
                  <Image alt="about" src={abtshoe} className="abtimg" />
                </div>
                <div>
                  <p className="font-para text-gray-700 dark:text-gray-400 abtpara">
                    During the Covid-19 pandemic, Co-founder and CEO Mikey Young
                    began selling sneakers and was exposed to the problem that
                    sellers face daily. With resale platforms charging an ~11%
                    processing fee per transaction, sellers will mark up prices
                    to make a reasonable profit, but in exchange, make an
                    already exclusive shoe, even more inaccessible for
                    interested buyers.
                  </p>
                  <p className="font-para text-gray-700 dark:text-gray-400 abtpara">
                    {" "}
                    Enter Estuary: a new subscription-based marketplace designed
                    to provide buyers the most affordable prices and equip
                    sellers with the tools to sell smarter. Our
                    subscription-based pricing model empowers sellers to achieve
                    stronger margins and provides buyers with more affordable
                    pricing.
                  </p>
                  <p className="font-para text-gray-700 dark:text-gray-400 abtpara">
                    Additionally, our seller inventory tool simplifies the
                    entire selling process for everyone, regardless of their
                    level of experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="aboutrow max-w-screen-xl mx-auto mb-10">
            <div>
              <Image alt="about" src={shoe} className="aboutimg" />
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                Estuary Verification
              </h5>
              <p className="font-para text-gray-700   dark:text-gray-400 para text-center">
                Our digital verification process allows you to capture more
                profit from each sale while ensuring your orders reach their
                destination faster.
              </p>
            </div>
            <div>
              <Image alt="about" src={store} className="aboutimg" />
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                Attractive Pricing
              </h5>
              <p className="font-para text-gray-700  dark:text-gray-400 para text-center">
                At Estuary, we apply a discount to the market price of every
                individual item, meaning you get the hottest sneakers at the
                best prices available!
              </p>
            </div>
            <div>
              <Image alt="about" src={money} className="aboutimg" />
              <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                A Marketplace for Everyone
              </h5>
              <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                Say goodbye to marketplace premiums! With Estuary, you don't
                need to break the bank in order to rock the kicks you love!
              </p>
            </div>
          </div>
          <div>
            <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-primarycolor leading-normal mb-4 font-extrabold">
              How it Works
            </h5>
            <div className="grid gap-1 md:gap-0 md:grid-cols-2">
              <div>
                <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-primarycolor leading-normal mb-5 font-bold">
                  Buy
                </h5>
                <div>
                  <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                    Shop
                  </h5>
                  <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                    Search our shop for the sneakers you want
                  </p>
                </div>
                <div>
                  <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                    Save
                  </h5>
                  <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                    Purchase your sneakers for the most affordable price on the
                    market!
                  </p>
                </div>
                <div>
                  <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                    Wear
                  </h5>
                  <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                    Rock your kicks, and turn heads with your new purchase
                  </p>
                </div>
              </div>
              <div>
                <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-primarycolor leading-normal mb-5 font-bold">
                  Sell
                </h5>
                <div>
                  <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                    Subscribe
                  </h5>
                  <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                    Choose the subscription plan that works best for you!
                  </p>
                </div>
                <div>
                  <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                    Customize
                  </h5>
                  <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                    Customize your seller profile and payout method!
                  </p>
                </div>
                <div>
                  <h5 className="text-center text-1xl lg:text-2xl xl:text-2xl font-medium text-black-600 leading-normal">
                    List
                  </h5>
                  <p className="font-para   text-gray-700 dark:text-gray-400 para text-center">
                    List your sneakers, and we'll guarantee the best prices on
                    the market!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default About;
