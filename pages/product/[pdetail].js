import "remixicon/fonts/remixicon.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { use, useEffect } from "react";
import { useSelector } from "react-redux";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Link from "next/link";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Rate } from "antd";
import Layout from "../../components/Layout/Layout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import SeoHead from "../../components/SeoHead";
import Image from "next/image";
import discountModal from "../../components/misc/discountModal";
// analysis
// import buy from "../../components/asset/buy.png";
// import sell from "../../components/asset/sell.png";
// import hold from "../../components/asset/hold.png";
import { Collapse, Select } from "antd";

import _, { max, set } from "lodash";
import { useDispatch } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend);
const { Option } = Select;
export const getServerSideProps = async (context) => {
  const { params } = context;
  const productId = params.pdetail;

  const res = await axios.get(
    `https://sneaker-api-phi.vercel.app/getsneaker/${productId}`
  );
  const data = await res.data;
  return {
    props: {
      pdata: data,
    },
  };
};

const ProductDetail = ({ pdata }) => {
  const dispatch = useDispatch();
  const [pm_data, setpm_data] = React.useState(pdata);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1300 },
      items: 4,
    },
    midlap: {
      breakpoint: { max: 1300, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [totalcount, setTotalcount] = React.useState(0);
  const [totalStars, settotalStars] = React.useState({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [totalrate, settotalrate] = React.useState(0);
  const [rating, setrating] = React.useState(0);
  const [similar_prod, setSimilar] = React.useState([]);
  const [similar_brand, setsimilar_brand] = React.useState([]);
  const [Listed, setListed] = React.useState(0);
  const { user } = useSelector((state) => state.user);
  const handleAddToCart = async () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new service to cart
      cart.push({
        ...pm_data[0],
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      // setTooltip("Added");
      //add to redux store
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      toast.success("Added to cart");
    }
  };
  //usestate for vote
  // const [analytstype, setanalytstype] = React.useState("");
  // const [totalanalyst, settotalanalyst] = React.useState({
  //   buy: 0,
  //   sell: 0,
  //   hold: 0,
  //   total: 0,
  // });
  // React.useEffect(() => {
  //   if (pm_data[0].analytics && pm_data[0].analytics.length > 0) {
  //     pm_data[0].analytics.map((e) => {
  //       if (e.type == "buy") {
  //         settotalanalyst((prev) => ({
  //           ...prev,
  //           buy: prev.buy + 1,
  //           total: prev.total + 1,
  //         }));
  //       } else if (e.type == "sell") {
  //         settotalanalyst((prev) => ({
  //           ...prev,
  //           sell: prev.sell + 1,
  //           total: prev.total + 1,
  //         }));
  //       } else if (e.type == "hold") {
  //         settotalanalyst((prev) => ({
  //           ...prev,
  //           hold: prev.hold + 1,
  //           total: prev.total + 1,
  //         }));
  //       }
  //     });
  //     //for user history vote set
  //     if (user && user.email) {
  //       pm_data[0].analytics.map((e) => {
  //         if (e.email == user.email) {
  //           setanalytstype(e.type);
  //           return;
  //         }
  //       });
  //     }
  //   }

  //   // return () => {
  //   //   settotalanalyst({
  //   //     buy: 0,
  //   //     sell: 0,
  //   //     hold: 0,
  //   //     total: 0,
  //   //   });

  //   // };
  // }, [user, pm_data[0]]);
  useEffect(() => {
    if (user && user.email) {
      setListed(user.isListed);
    }
  }, [user]);

  useEffect(() => {
    //get similar products from same sku
    const getSimilar = async () => {
      if (pm_data[0].styleID) {
        await axios
          .get(
            "https://sneaker-api-phi.vercel.app/getsimilarsneaker/" +
              pm_data[0].styleID +
              "?prodid=" +
              pm_data[0]._id
          )
          .then((res) => {
            var data = res.data;
            data = data.filter(
              (item) => item.show == false && item.discount_price > 0
            );
            setSimilar(data);
          });
      }
    };
    getSimilar();
    // getListed();
  }, []);

  useEffect(() => {
    //get similar products from same brand
    const getSimilarbrand = async () => {
      if (pm_data[0].styleID) {
        await axios
          .get(
            "https://sneaker-api-phi.vercel.app/getsimilarbrand/" +
              pm_data[0].brand +
              "?prodid=" +
              pm_data[0]._id
          )
          .then((res) => {
            var data = res.data;
            data = data.filter(
              (item) => item.show == false && item.discount_price > 0
            );
            setsimilar_brand(data);
          });
      }
    };
    getSimilarbrand();
  }, []);
  useEffect(() => {
    if (pm_data[0].rating && pm_data[0].rating.length > 0) {
      settotalrate(pm_data[0].rating.length);
      if (user && user.email) {
        pm_data[0].rating.map((e) => {
          if (e.email == user.email) {
            setrating(e.rating);
            return;
          }
        });
      }
      pm_data[0].rating.map((e) => {
        setTotalcount((prev) => prev + 1);
      });
      pm_data[0].rating.map((e) => {
        if (e.rating == 5) {
          settotalStars((prev) => ({
            ...prev,
            5: prev[5] + 1,
          }));
        } else if (e.rating == 4) {
          settotalStars((prev) => ({
            ...prev,
            4: prev[4] + 1,
          }));
        } else if (e.rating == 3) {
          settotalStars((prev) => ({
            ...prev,
            3: prev[3] + 1,
          }));
        } else if (e.rating == 2) {
          settotalStars((prev) => ({
            ...prev,
            2: prev[2] + 1,
          }));
        } else if (e.rating == 1) {
          settotalStars((prev) => ({
            ...prev,
            1: prev[1] + 1,
          }));
        }
      });
    }
    return () => {
      setTotalcount(0);
      settotalStars({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      });
      setrating(0);
      settotalrate(0);
    };
  }, [user, pm_data[0]]);
  const [load, setload] = React.useState(false);
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const checkpayment = async (e) => {
    e.preventDefault();
    if (user && user.email) {
      setload(true);
      const stripe = await stripePromise;
      //https://sneaker-api-phi.vercel.app
      await axios
        .post("https://sneaker-api-phi.vercel.app/buysneaker", {
          product: pm_data,
          user: user,
          prod_status: [{ status: "Confirm Order", id: 0 }],
          total_price: pm_data[0].discount_price,
          fee: [discountModal[Listed > 50 ? 50 : Listed]],
        })
        .then(async (id) => {
          const checkoutSession = await axios.post(
            "/api/create-stripe-session",
            {
              item: pm_data,
              _id: id,
              email: user.email,
              productId: [pm_data[0]._id],
              price: pm_data[0].discount_price,
            }
          );
          const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
          });
          setload(false);
          if (result.error) {
            toast.error(result.error.message);
          }
        });
    } else {
      toast.error("Please Login to continue");
    }
  };
  var analyst = pm_data[0].analytics;

  //onClick for vote
  // const handevote = async (e, type) => {
  //   e.preventDefault();
  //   if (analyst === "undefined" || analyst === null || analyst.length == 0) {
  //     analyst = [
  //       {
  //         type: type,
  //         email: user.email,
  //       },
  //     ];
  //     //axios
  //     await axios
  //       .post(
  //         "https://sneaker-api-phi.vercel.app/updateanalytics",
  //         {
  //           id: pm_data[0]._id,
  //           analyst: analyst,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .catch((err) => console.log(err));
  //     setanalytstype(type);
  //     settotalanalyst((prev) => ({
  //       ...prev,
  //       [type]: prev[type] + 1,
  //       total: prev.total + 1,
  //     }));
  //     return;
  //   } else {
  //     analyst.map((e, idx) => {
  //       if (e.email == user.email) {
  //         analyst.splice(idx, 1);
  //         settotalanalyst((prev) => ({
  //           ...prev,
  //           [e.type]: prev[e.type] - 1,
  //           total: prev.total - 1,
  //         }));
  //       }
  //     });
  //     analyst.push({
  //       type: type,
  //       email: user.email,
  //     });
  //     //axios
  //     await axios
  //       .post(
  //         "https://sneaker-api-phi.vercel.app/updateanalytics",
  //         {
  //           id: pm_data[0]._id,
  //           analyst: analyst,
  //         },
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       )
  //       .catch((err) => console.log(err));
  //     setanalytstype(type);
  //     settotalanalyst((prev) => ({
  //       ...prev,
  //       [type]: prev[type] + 1,
  //       total: prev.total + 1,
  //     }));
  //     return;
  //   }
  // };

  //for pie chart if set zero then it will show 0% and 100% for all
  // var conditionalData =
  //   totalanalyst.total == 0
  //     ? [1e-10, 1e-10, 1e-10]
  //     : [totalanalyst.hold, totalanalyst.buy, totalanalyst.sell];

  //pie chart data
  // var data = {
  //   labels: ["Hold", "Buy", "Sell"],
  //   datasets: [
  //     {
  //       label: "# of rating",
  //       data: conditionalData,
  //       backgroundColor: ["#3E6BF7", "#003DF9", "#001968"],
  //       borderColor: [
  //         "rgba(255, 99, 132, 1)",
  //         "rgba(54, 162, 235, 1)",
  //         "rgba(255, 206, 86, 1)",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };
  //3fr 3fr 1fr
  const handlestar = async (e, prev_rate) => {
    var star = pm_data[0].rating;
    if (star === "undefined" || star === null || star.length == 0) {
      star = [
        {
          rating: e,
          email: user.email,
        },
      ];
      setTotalcount((prev) => prev + 1);
      settotalStars((prev) => ({
        ...prev,
        [e]: prev[e] + 1,
      }));
      await axios
        .post(
          "https://sneaker-api-phi.vercel.app/addrating",
          {
            _id: pm_data[0]._id,
            rate: star,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          setpm_data((prev) => [
            {
              ...prev[0],
              rating: star,
            },
          ]);
        })
        .catch((err) => console.log(err));
      settotalrate((prev) => prev + 1);
      setrating(e);

      //to show and list all the ratings eg: 5,4,3,2,1 individually
      // settotalrate((prev) => ({
      //   ...prev,
      //   [e]: prev[e] + 1,
      //   total: prev.total + 1,
      // }));
      return;
    } else {
      var flag = 0;
      star.map((e, idx) => {
        if (e.email == user.email) {
          star.splice(idx, 1);
          flag = -1;

          // settotalanalyst((prev) => ({
          //   ...prev,
          //   [e.rating]: prev[e.rating] - 1,
          //   total: prev.total - 1,
          // }));
        }
      });
      setTotalcount((prev) => prev + flag + 1);
      flag = 0;
      settotalStars((prev) => ({
        ...prev,
        [prev_rate]: prev[prev_rate] - 1,
        [e]: prev[e] + 1,
      }));

      star.push({
        rating: e,
        email: user.email,
      });
      //axios
      await axios
        .post(
          "https://sneaker-api-phi.vercel.app/addrating",
          {
            _id: pm_data[0]._id,
            rate: star,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .catch((err) => console.log(err));
      setrating(e);

      // settotalanalyst((prev) => ({
      //   ...prev,
      //   [e]: prev[e] + 1,
      //   total: prev.total + 1,
      // }));
      return;
    }
  };
  const items = [
    {
      key: "1",
      label: "Size: ",
      children: (
        <div>
          {similar_prod.length > 0 &&
            similar_prod.map((e_data) => {
              return (
                <button
                  key={e_data._id}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSimilar(
                      similar_prod
                        .filter((i) => i._id != e_data._id)
                        .concat(pm_data[0])
                    );
                    setpm_data([e_data]);
                  }}
                  className="py-0.5 mr-1.5 px-1.5 md:py-1 md:px-2.5 md:mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {e_data.size}
                  <br />${Math.round(e_data.discount_price)}
                </button>
              );
            })}
        </div>
      ),
      //extra: genExtra(),
    },
  ];
  var avg_star =
    totalStars[1] * 1 +
    totalStars[2] * 2 +
    totalStars[3] * 3 +
    totalStars[4] * 4 +
    totalStars[5] * 5;
  var total_sum =
    totalStars[1] +
    totalStars[2] +
    totalStars[3] +
    totalStars[4] +
    totalStars[5];
  return (
    <>
      <SeoHead title="Sneaker" />
      {pm_data && pm_data[0].brand ? (
        <Layout>
          <div className="cardmain pt-24">
            <div className="card__title">
              <div className="icon">
                <Link href="/">
                  <i className="ri-arrow-left-s-line"></i>
                </Link>
              </div>
              <h3>{pm_data[0].brand}</h3>
            </div>

            <div className="bodyhead">
              <div className="card__body">
                <div className="half">
                  <div className="featured_text">
                    <h1
                      className="font-design font-normal text-gray-700 dark:text-gray-400"
                      style={{
                        fontSize: "25px",
                        lineHeight: "30px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {pm_data[0].shoeName}
                    </h1>
                    <h1 className="sub font-design">
                      ${Math.round(pm_data[0].discount_price)}
                    </h1>
                    {/* <p className="price">₹{pm_data[0].prize}</p> */}
                  </div>
                  <div className="image">
                    {/* <Carousel
                      autoPlay
                      interval={2500}
                      infiniteLoop
                      showArrows={false}
                      showStatus={false}
                    > */}
                    {/* {pm_data[0].thumbnail &&
                        pm_data[0].thumbnail.map((i) => ( */}
                    <img
                      src={pm_data[0].thumbnail}
                      key={pm_data[0]._id}
                      alt="image not found"
                      style={{ maxWidth: "100%" }}
                    />
                    {/* ))} */}
                    {/* </Carousel> */}
                  </div>
                </div>
                <div className="half">
                  <div className="description">
                    <p>{pm_data[0].description ?? ""}</p>
                  </div>
                  {user && user.email != pm_data[0].email && (
                    <span className="stock text-scolor flex items-center flex-wrap capitalize">
                      <Link href={`/sell/form/${pm_data[0]._id}`}>
                        List for ${Math.round(pm_data[0].discount_price)}{" "}
                        <i class="ri-arrow-right-line"></i>
                      </Link>
                    </span>
                  )}
                  <br />

                  <div className="reviews">
                    <h3
                      className="mb-2"
                      style={{
                        fontWeight: "500",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",
                        color: "#181e28",
                      }}
                    >
                      Size: <span> {pm_data[0].size}</span>
                    </h3>
                    {/* <h3
                      style={{
                        fontWeight: "500",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",

                        color: "#181e28",
                      }}
                    >
                      Gender:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {" "}
                        {pm_data[0].gender}
                      </span>
                    </h3> */}{" "}
                    {similar_prod.length > 0 && (
                      <div>
                        <Collapse
                          defaultActiveKey={["1"]}
                          //onChange={onChange}
                          expandIconPosition="end"
                          items={items}
                        />
                      </div>
                    )}
                    <div className="action">
                      {/* <a href=""> */}
                      <button
                        className="mt-2"
                        onClick={checkpayment}
                        type="button"
                      >
                        {!load ? (
                          <span>Buy now</span>
                        ) : (
                          <span>Redirecting...</span>
                        )}
                      </button>
                      {/* </a> */}
                    </div>
                    {/* vote analysis */}
                    {/* {user && user.email && (
                      <div className="flex flex-row  mt-2">
                        <button
                          className=" px-2"
                          disabled={analytstype == "buy" ? true : false}
                        >
                          <Image
                            style={{
                              background: analytstype == "buy" ? "#e7ecef" : "",
                              borderRadius: analytstype == "buy" ? "50%" : "",
                              padding: "2px",
                            }}
                            src={buy}
                            onClick={(e) => handevote(e, "buy")}
                            width={40}
                          />
                          <span className="sub text-center capitalize">
                            Buy
                          </span>
                        </button>
                        <button
                          disabled={analytstype == "sell" ? true : false}
                          onClick={(e) => handevote(e, "sell")}
                          className=" px-2"
                        >
                          <Image
                            style={{
                              background:
                                analytstype == "sell" ? "#e7ecef" : "",
                              borderRadius: analytstype == "sell" ? "50%" : "",
                              padding: "2px",
                            }}
                            src={sell}
                            width={40}
                          />
                          <span className="sub text-center capitalize">
                            Sell
                          </span>
                        </button>
                        <button
                          disabled={analytstype == "hold" ? true : false}
                          onClick={(e) => handevote(e, "hold")}
                          className=" px-2"
                        >
                          <Image
                            style={{
                              background:
                                analytstype == "hold" ? "#e7ecef" : "",
                              borderRadius: analytstype == "hold" ? "50%" : "",
                              padding: "2px",
                            }}
                            src={hold}
                            width={40}
                          />
                          <span className="sub text-center capitalize">
                            Hold
                          </span>
                        </button>
                      </div>
                    )} */}
                    {/* cart */}
                    {/* <button
                      type="button"
                      className="bttn cartsvg"
                      onClick={handleAddToCart}
                    >
                      <i class="ri-shopping-cart-2-fill"></i> Cart
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card__footer">
              <div className="recommend">
                {/* <p>By</p>
                <h3 style={{ wordBreak: "break-word" }}>{pm_data[0].name}</h3> */}
                {/* {user && user.email && ( */}
                <div>
                  <Rate
                    style={{ color: "#021b65", fontSize: "25px" }}
                    allowClear={false}
                    //defaultValue={rating}
                    disabled={user && user.email ? false : true}
                    value={rating}
                    onChange={(e) => handlestar(e, rating)}
                  />{" "}
                  &nbsp;
                  <span>
                    {totalrate > 0
                      ? (avg_star / total_sum).toPrecision(3)
                      : "0.0"}
                    {" (" + totalcount + " Ratings )"}
                  </span>
                </div>
                {/* )} */}
              </div>
              <div className="action">
                {/* <a href=""> */}
                {/* <button onClick={checkpayment} type="button">
                  {!load ? <span>Buy now</span> : <span>Redirecting...</span>}
                </button> */}
                {/* </a> */}
              </div>
            </div>
            <ToastContainer />
          </div>
          <br />
          {/* analysis */}
          {/* <div className="cardmain mb-10 pb-10 ">
            <div className="card__title">
              <h1 className="text-3xl lg:text-2xl xl:text-3xl font-medium text-black-600 leading-normal">
                Sneaker Ratings
              </h1>
            </div>
            <div
              className="analytics"
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 3fr 1fr",
                placeItems: "center",

                marginInline: "auto",
              }}
            >
              <div>
                <Pie data={data} />
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "15px",
                    padding: "2px",
                  }}
                >
                  {totalanalyst.total == 0
                    ? "0.00"
                    : max([
                        ((totalanalyst.buy / totalanalyst.total) * 100).toFixed(
                          2
                        ),
                        (
                          (totalanalyst.sell / totalanalyst.total) *
                          100
                        ).toFixed(2),
                        (
                          (totalanalyst.hold / totalanalyst.total) *
                          100
                        ).toFixed(2),
                      ])}
                  %
                  <br /> of {totalanalyst.total} rating
                </p>
              </div>
              <div style={{ width: "80%" }} className="flex flex-wrap flex-col">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <h2
                    className="font-medium text-black-600 leading-normal text-center lg:text-xl capitalize"
                    style={{ color: "#3E6BF7" }}
                  >
                    hold
                  </h2>

                  <p
                    style={{
                      width:
                        `${
                          parseInt(
                            (totalanalyst.hold / totalanalyst.total) * 100
                          ) + 1
                        }` + `%`,
                      borderBottom: "6px solid #3E6BF7",
                      fontWeight: "bold",
                      borderRadius: "15px",
                    }}
                  ></p>
                  <span style={{ fontWeight: "500", color: "#3E6BF7" }}>
                    {totalanalyst.total == 0
                      ? "0.00"
                      : (
                          (totalanalyst.hold / totalanalyst.total) *
                          100
                        ).toFixed(2)}
                    %
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <h2
                    style={{
                      color: "#003DF9",
                    }}
                    className="lg:text-xl font-medium text-black-600 leading-normal text-center capitalize"
                  >
                    buy
                  </h2>
                  <p
                    style={{
                      width:
                        `${
                          parseInt(
                            (totalanalyst.buy / totalanalyst.total ?? "0.00") *
                              100
                          ) + 1
                        }` + `%`,
                      borderBottom: "5px solid #003DF9",
                      fontWeight: "500",
                      borderRadius: "15px",
                    }}
                  ></p>

                  <span style={{ fontWeight: "500", color: "#003DF9" }}>
                    {totalanalyst.total == 0
                      ? "0.00"
                      : ((totalanalyst.buy / totalanalyst.total) * 100).toFixed(
                          2
                        )}
                    %
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <h2
                    className="lg:text-xl font-medium text-black-600 leading-normal text-center capitalize"
                    style={{ color: "#001968" }}
                  >
                    sell
                  </h2>
                  <p
                    style={{
                      width:
                        `${
                          parseInt(
                            (totalanalyst.sell / totalanalyst.total) * 100
                          ) + 1 ?? "0.00"
                        }` + `%`,
                      borderBottom: "6px solid #001968",
                      borderRadius: "15px",
                    }}
                  ></p>
                  <span style={{ fontWeight: "500", color: "#001968" }}>
                    {totalanalyst.total == 0
                      ? "0.00"
                      : (
                          (totalanalyst.sell / totalanalyst.total) *
                          100
                        ).toFixed(2)}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          {similar_brand.length > 0 && (
            <div className="coum mt-3">
              <div className="card__title">
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-medium text-black-600 leading-normal">
                  Similar Products
                </h1>
              </div>
              <Carousel
                responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={3000}
                swipeable={true}
                infinite={true}
                showDots={false}
              >
                {similar_brand.length > 0 &&
                  similar_brand.map((p) => {
                    return (
                      <a href={`/Product/${p._id}`} className="cursor-pointer">
                        <div
                          key={p._id}
                          style={{
                            width: "auto",
                            // maxWidth: "50%",
                          }}
                          className="bg-white shadow-lg rounded-lg mx-0 md:mx-2 my-2"
                        >
                          <div
                            className=" bg-cover"
                            style={{
                              width: "140px",
                              height: "100px",
                              margin: "0px auto",
                              backgroundImage: `url(${p.thumbnail})`,
                            }}
                          ></div>
                          <div className=" p-4">
                            <h1
                              style={{ height: "30px", overflow: "hidden" }}
                              className="text-gray-900 font-bold text-lg"
                            >
                              {p.shoeName}
                            </h1>
                            <p className="mt-2 text-gray-600 text-sm">
                              {p.size}
                            </p>

                            <div className="flex item-center justify-between mt-3">
                              <h1 className="text-gray-700 font-bold text-xl">
                                ${Math.round(p.discount_price)}
                              </h1>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </a>
                    );
                  })}
              </Carousel>
            </div>
          )}
        </Layout>
      ) : (
        <div className="loader"></div>
      )}
    </>
  );
};

export default ProductDetail;
