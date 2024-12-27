import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { Pagination } from "antd";
import { Skeleton } from "antd";
import ScrollAnimationWrapper from "./layout/ScrollAnimationWrapper";
//import getScrollAnimation from "../utils/getScrollAnimation";
import Link from "next/link";
const Shop = () => {
  const [senakers, setSenakers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setcount] = React.useState();
  const [loading, setloading] = React.useState(false);
  const getdat = async () => {
    const res = await axios.get(
      "https://sneaker-api-phi.vercel.app/getallsneaker"
    );
    var data = await res.data;
    data = data
      .filter(
        (item) =>
          item.show == false && item.discount_price > 0 && item.sold == false
      )
      .reverse()
      .slice(0, 24);
    setcount(data.length);
    if (page == 1) {
      setSenakers(
        data
          .filter(
            (item, index, self) =>
              self.findIndex((obj) => obj.styleID === item.styleID) === index
          )
          .slice(0, 6)
      );
    } else {
      setSenakers(
        data
          .filter(
            (item, index, self) =>
              self.findIndex((obj) => obj.styleID === item.styleID) === index
          )
          .slice(6 * (page - 1), 6 * page)
      );
    }
    setloading(true);
    //setSenakers(data);
  };
  React.useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    getdat();
  }, [page]);

  return (
    <>
      <ScrollAnimationWrapper>
        <motion.div
          // variants={scrollAnimation}
          className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
        >
          <h3
            className="text-2xl sm:text-3xl text-center lg:text-4xl font-medium text-black-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto pb-3"
            id="Snearker"
          >
            New Listings
          </h3>
          {loading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "40px",
              }}
            >
              <div id="shop" className="displaygrid justify-center">
                {senakers &&
                  senakers.map((item) => {
                    return (
                      <>
                        <Link href={`/Product/${item._id}`}>
                          <motion.div
                            key={item._id}
                            data-aos="fade-up"
                            data-aos-offset="200"
                            data-aos-delay="50"
                            className="cardsize bg-white border border-gray-200 rounded-lg dark:bg-gray-800 smallscreen-center"
                            style={{
                              boxShadow:
                                "rgba(0, 0, 0, 0.2) 10px 14px 20px -10px",
                              border: "1px solid rgba(0, 0, 0, 0.2)",
                              height: "100%",
                              boxSizing: "border-box",
                              // marginTop: "5vh",
                            }}
                          >
                            <img
                              alt="Product"
                              style={{
                                // backgroundPosition: "center",
                                maxWidth: "100%",
                                padding: "15px",
                                borderRadius: "10px",
                                objectFit: "cover",
                                maxWidth: "100%",
                                // transform: "translate(25px)",
                              }}
                              className="rounded-t-lg"
                              src={item.thumbnail}
                            />

                            <div className="p-5">
                              <h5
                                style={{ height: "36px", overflow: "hidden" }}
                                className="font-design font-normal text-gray-700 dark:text-gray-400"
                              >
                                {item.shoeName}
                              </h5>
                              <span
                                style={{
                                  fontSize: "15px",
                                  fontWeight: "400",
                                }}
                              >
                                {item.styleID}
                              </span>
                              <br />
                              <span
                                style={{
                                  fontSize: "26px",
                                  fontWeight: "500",
                                }}
                                className="
                                mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white
                              "
                              >
                                ${Math.round(item.discount_price)}
                              </span>
                            </div>
                          </motion.div>
                        </Link>
                      </>
                    );
                  })}
              </div>
              <Pagination
                current={page}
                onChange={(page) => setPage(page)}
                total={Math.floor((count / 6) * 10)}
              />
            </div>
          ) : (
            <div className="px-20 lg:px-24">
              <div
                id="shop"
                className="displaygrid justify-center"
                style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
              >
                <Skeleton active />
              </div>
            </div>
          )}
        </motion.div>
      </ScrollAnimationWrapper>
    </>
  );
};

export default Shop;
