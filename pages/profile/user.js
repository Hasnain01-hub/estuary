import React from "react";
import { Tooltip } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { db } from "../../utils/Firebase";
import { loginSuccess } from "../../reducer";
// import "remixicon/fonts/remixicon.css";
import { useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";

import Link from "next/link";

import axios from "axios";
import SeoHead from "../../components/SeoHead";
import UpperButton from "../../components/sidebar/Button";
import Sidebar from "../../components/sidebar/Sidebar";
export const getServerSideProps = async (context) => {
  const body = context.query.code;
  if (!body) {
    return { props: { data: null, req: null } };
  }

  var response;
  try {
    response = await axios
      .post(
        process.env.NEXT_PUBLIC_HOME_URL + "/api/verifyStripe",
        { body: body },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
    return { props: { data: null, req: body } };
  }

  return { props: { data: response, req: body } };
};
const User = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [userdata, setuserdata] = React.useState({});
  React.useEffect(() => {
    if (user && user.email) {
      setuserdata(user);
      handleRedirect(user);
    }
  }, [user, data]);
  const copyText = (e, text) => {
    e.preventDefault();
    // const textToCopy = "Text you want to copy"; // Replace with the text you want to copy
    navigator.clipboard.writeText(text).catch((err) => {
      console.log(err);
      toast.error("Error copying text");
    });
  };
  const handleRedirect = async (user) => {
    if (user && !user?.stripe_id) {
      if (data && data?.account?.id) {
        await db.collection("users").doc(user.email).update({
          stripe_id: data?.account?.id,
        });
        dispatch(
          loginSuccess({
            name: user.name,
            email: user.email,
            url: user.url,
            date: user.date,
            lastname: user?.lastname,
            stripe_id: data?.account?.id,
            size: user?.size,
            gender: user?.gender,
            phone: user?.phone,
            country: user?.country,
            state: user?.state,
            postalCode: user?.postalCode,
            city: user?.city,
            street: user?.street,
            //address: user?.address,
            role: user.role,
          })
        );
        setuserdata({
          ...user,
          stripe_id: data?.account?.id,
        });
      }
    }
  };
  const setExpress = async (e) => {
    e.preventDefault();
    if (userdata && userdata.stripe_id) {
      let headersList = {
        Accept: "*/*",
        Authorization:
          "Bearer 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",
      };

      let reqOptions = {
        url: `https://api.stripe.com/v1/accounts/${userdata.stripe_id}/login_links`,
        method: "POST",
        headers: headersList,
      };

      await axios
        .request(reqOptions)
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((err) => console.log(err));
    }
  };
  var address =
    user && user?.email
      ? user?.country +
        "! " +
        user?.state +
        "! " +
        user?.city +
        "! " +
        user?.street +
        "! " +
        user?.postalCode
      : "";

  return (
    <>
      <SeoHead title="Profile Page" />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap">
            <Sidebar open={open} />
            <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
              <div className="container mx-auto">
                <div>
                  <div className="container mx-auto my-5 p-5">
                    <div className="md:flex no-wrap md:-mx-2 ">
                      <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                          <div className="image overflow-hidden">
                            <img
                              style={{
                                width: "190px",
                              }}
                              className="h-auto  mx-auto"
                              src={user && user.url}
                              alt="user image"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                            {(user && user.name) || "John"}&nbsp;
                            {(user && user.lastname) || ""}
                          </h1>

                          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                              <span>Role</span>
                              <span className="ml-auto">
                                <span className="bg-maincolor text-white-300 capitalize py-1 px-2 rounded text-white text-sm">
                                  {(user && user.role) || "not logged in"}
                                </span>
                              </span>
                            </li>
                            <li className="flex items-center py-3">
                              <span>Member since</span>
                              <span className="ml-auto">
                                {(user && user.date) || "Nov 07, 2016"}
                              </span>
                            </li>
                          </ul>
                        </div>

                        <div className="my-4"></div>
                      </div>

                      <div className="w-full md:w-9/12 sm:mx-2  flex flex-col gap-6">
                        <div className=" sm:p-4  bg-white rounded-lg shadow sm:p-8 dark:bg-#f8f8f8 dark:border-gray-700">
                          <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span clas="text-green-500">
                              {/* <i class="ri-user-3-line"></i> */}
                            </span>
                            <span
                              style={{
                                fontWeight: "bolder",
                                fontSize: "20px",
                              }}
                              className="tracking-wide text-maincolor"
                            >
                              Profile
                            </span>
                          </div>
                          <div className="text-gray-700">
                            <div className="grid md:grid-cols-3 text-lg">
                              <div className="grid sm:grid-cols-1 grid-cols-2">
                                <div className="px-4 py-2 font-semibold text-maincolor">
                                  Name
                                </div>
                                <div
                                  className="px-4 py-2"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  {(user && user.name) || "John "}&nbsp;
                                  {(user && user.lastname) || ""}
                                </div>
                              </div>
                              <div className="grid sm:grid-cols-1 grid-cols-2">
                                <div
                                  style={{ wordBreak: "break-word" }}
                                  className="px-4 py-2 font-semibold text-maincolor "
                                >
                                  Shoe Size
                                </div>
                                <div className="px-4 py-2">
                                  {(user && user.size) || "?"}
                                </div>
                              </div>

                              <div className="grid sm:grid-cols-1 grid-cols-2">
                                <div
                                  style={{ wordBreak: "break-word" }}
                                  className="px-4 py-2 font-semibold text-maincolor "
                                >
                                  Email
                                </div>
                                <div
                                  className="px-4 py-2"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  <a
                                    className="text-blue-800"
                                    href={
                                      (user && `mailto:${user.email}`) ||
                                      "mailto:jane@example.com"
                                    }
                                  >
                                    {(user && user.email) || "?"}
                                  </a>
                                </div>
                              </div>
                              <div className="grid sm:grid-cols-1 grid-cols-2">
                                <div
                                  style={{ wordBreak: "break-word" }}
                                  className="px-4 py-2 font-semibold text-maincolor "
                                >
                                  Shipping
                                </div>
                                <div
                                  className="px-4 py-2"
                                  style={{ wordBreak: "break-word" }}
                                >
                                  {address
                                    .split(" ")
                                    .filter(
                                      (x) =>
                                        x == "undefined!" || x == "undefined"
                                    ).length < 5
                                    ? address
                                        .split(" ")
                                        .filter(
                                          (x) =>
                                            x != "undefined!" &&
                                            x != "undefined"
                                        )
                                        .join(" ")
                                        .replace(new RegExp("!", "g"), ", ")
                                    : "Not set"}
                                </div>
                              </div>

                              <div className="grid sm:grid-cols-1 grid-cols-2">
                                <div className="px-4 py-2 font-semibold text-maincolor ">
                                  Phone
                                </div>
                                <div
                                  style={{ wordBreak: "break-word" }}
                                  className="px-4 py-2"
                                >
                                  {(user && user.phone) || "?"}
                                </div>
                              </div>
                              <div className="grid sm:grid-cols-1 grid-cols-2">
                                <div className="px-4 py-2 font-semibold text-maincolor ">
                                  Referral Link
                                </div>
                                <div
                                  style={{ wordBreak: "break-word" }}
                                  className="px-4 py-2"
                                >
                                  {
                                    <Tooltip title="Copy Referral Code">
                                      <div
                                        onClick={(e) =>
                                          copyText(
                                            e,
                                            `${process.env.NEXT_PUBLIC_HOME_URL}/login?referral=` +
                                              (user && user.email) || "Not set"
                                          )
                                        }
                                        style={{
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "space-around",
                                          // gap: "2px",
                                          cursor: "pointer",
                                          padding: "5px 8px",
                                          background: "#f8f8f8",
                                          borderRadius: "15px",
                                          color: "#031b6e",
                                        }}
                                      >
                                        <span>
                                          {(
                                            `${process.env.NEXT_PUBLIC_HOME_URL}/login?referral=` +
                                              (user && user.email) || "Not set"
                                          ).substring(0, 20) + "..."}
                                        </span>
                                        <svg
                                          className="w-6 h-6"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM8 2H16V6H8V2Z"
                                            fill="rgba(1,25,104,1)"
                                          ></path>
                                        </svg>
                                      </div>
                                    </Tooltip>
                                  }
                                </div>
                              </div>
                            </div>
                          </div>
                          <Link href="/edit/userform">
                            <button
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "5px",
                              }}
                              className="block w-full text-blue-800 text-sm font-semibold text-maincolor  rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4"
                            >
                              <i className="ri-pencil-fill"></i> Edit
                            </button>
                          </Link>
                        </div>

                        <div className="mt-4 bg-white rounded-lg shadow sm:p-8 dark:bg-#f8f8f8 dark:border-gray-700 ">
                          <div className="w-full p-4 text-center bg-white ">
                            <h5
                              className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
                              style={{ color: "#031b6e" }}
                            >
                              Transform the way you sell
                            </h5>
                            <p className="mb-5 text-base text-gray-800 sm:text-lg dark:text-gray-400">
                              Create a seller account to get started
                            </p>
                            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                              {userdata && userdata.email ? (
                                userdata && userdata.stripe_id ? (
                                  <div onClick={setExpress}>
                                    <h2 className="font-semibold text-gray-800 text-center cursor-pointer">
                                      Open express dashboard
                                    </h2>
                                  </div>
                                ) : (
                                  <button
                                    className="grid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    style={{
                                      background: "white",
                                      background: "#011b69",
                                      color: "#fff",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      display: "flex",
                                    }}
                                  >
                                    <Link
                                      href={`https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID}`}
                                    >
                                      {" "}
                                      <span>Start now</span>
                                    </Link>
                                  </button>
                                )
                              ) : (
                                <Link href="/login">
                                  <h2 className="font-semibold text-gray-800 text-center">
                                    Login to continue
                                  </h2>
                                </Link>
                              )}
                            </div>
                          </div>
                          <ToastContainer />
                        </div>

                        <div className="my-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default User;
