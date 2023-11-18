import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import getScrollAnimation from "../utils/getScrollAnimation";
import ScrollAnimationWrapper from "./layout/ScrollAnimationWrapper";
// import Image from "next/image";
const features = [
  "Estuary Verification",
  "Attractive Pricing",
  "No Marketplace Fees",
  "No specific time limits.",
];
const images = [
  {
    src: "/assets/Icon/addidas.png",
  },
  {
    src: "/assets/Icon/balance.png",
  },
  {
    src: "/assets/Icon/ball.png",
  },
  {
    src: "/assets/Icon/nike.png",
  },
  {
    src: "/assets/Icon/yeezy.png",
  },
];
const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-8 mb-6 sm:mt-14 sm:mb-14 px-6 sm:px-8 lg:px-16 mx-auto"
      id="about"
    >
      {/* <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 my-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/assets/Illustration2.png"
              alt="VPN Illustrasi"
              layout="responsive"
              quality={100}
              height={414}
              width={508}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>
          <motion.div
            className="flex flex-col items-end justify-center ml-auto w-full lg:w-9/12"
            variants={scrollAnimation}
          >
            <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
              Sneakers you want, prices you deserve
            </h3>
            <p className="my-2 text-black-500">
              Our goal is to create more affordable ways to obtain exclusive
              sneakers
            </p>
            <ul
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              className="text-black-500 self-start list-inside ml-8 "
            >
              {features.map((feature, index) => (
                <motion.li
                  className="relative circle-check custom-list"
                  custom={{ duration: 2 + index }}
                  variants={scrollAnimation}
                  key={feature}
                  whileHover={{
                    scale: 1.1,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                >
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </ScrollAnimationWrapper>
      </div> */}
      <ScrollAnimationWrapper>
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
          variants={scrollAnimation}
        >
          {images.map((image, index) => {
            return (
              <img
                style={{
                  width: "204px",
                  height: "100px",
                }}
                src={image.src}
              />
            );
          })}
        </motion.div>
      </ScrollAnimationWrapper>
    </div>
  );
};

export default Feature;
