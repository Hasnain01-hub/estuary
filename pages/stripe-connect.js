import React from "react";
import "remixicon/fonts/remixicon.css";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout/Layout";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { db } from "../utils/Firebase";
import { loginSuccess } from "../reducer";
import Link from "next/link";
export const getServerSideProps = async (context) => {
  const body = context.query.code;
  if (!body) {
    return { props: { data: null, req: null } };
  }

  var response;
  try {
    response = await axios
      .post(process.env.NEXT_PUBLIC_HOME_URL + "/api/verifyStripe", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.data);
  } catch (error) {
    console.log(error);
    return { props: { data: null, req: body } };
  }

  return { props: { data: response, req: body } };
};

const StripeConnect = ({ data }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  //const [load, setload] = React.useState(false);
  const [userdata, setuserdata] = React.useState({});
  React.useEffect(() => {
    if (user && user.email) {
      setuserdata(user);
      handleRedirect(user);
    }
    //setloading(true);
  }, [user, data]);

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
            address: user?.address,
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
  // const getaccount = async (e) => {
  //   e.preventDefault();
  //   if (user && user.stripe_id) {
  //     const checkoutSession = await axios.post("/api/seller-account-retrival", {
  //       id: user.stripe_id,
  //     });
  //     console.log(checkoutSession.data);
  //   } else {
  //     toast.error("Please Login to continue");
  //   }
  // };
  return (
    <>
      <Layout>
        <div className="py-20 lg:py-24 px-10 lg:px-20 ">
          <div
            style={{ background: "#f8f8f8" }}
            className="w-full p-4 text-center bg-white rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700"
          >
            <h5
              className="mb-2 text-2xl font-bold text-gray-900 dark:text-white"
              style={{ color: "#031b6e" }}
            >
              Transform the way you sell Create a seller account with Estuary to
              get started
            </h5>
            <p className="mb-5 text-base text-gray-800 sm:text-lg dark:text-gray-400">
              Create a seller account to get started
            </p>
            <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
              {userdata && userdata.email ? (
                userdata && userdata.stripe_id ? (
                  <h2 className="font-semibold text-gray-800 text-center">
                    Connected
                  </h2>
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
      </Layout>
    </>
  );
};

export default StripeConnect;
//{data?.data?.account?.display_name}
//https://connect.stripe.com/express/oauth/authorize?response_type=code&client_id=ca_OKlpamU3ObjMgsaqwYyLEUXY7wUUxMON

//https://dashboard.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_STRIPE_OAUTH_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}
