import "../styles/tailwind.css";
import "../styles/slick.css";
import "../styles/globals.css";
import { wrapper, store } from "../reducer/user";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../reducer";
import { auth } from "../utils/Firebase";
import React from "react";

import { db } from "../utils/Firebase";
import Loading from "./loading";
import axios from "axios";
// import { set } from "lodash";

function MyApp({ Component, pageProps }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const updateProduct = async () => {
      await axios.get("https://sneaker-api-phi.vercel.app/updateallsneaker", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    const sendEmail = async () => {
      await axios.get("https://sneaker-api-phi.vercel.app/sendProfitEmail", {
        headers: {
          "Content-Type": "application/json",
        },
      });
    };
    // updateProduct()
    // .then(() => {
    //   setTimeout(() => {
    //     updateProduct();
    //   }, 2000);
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }, []);
  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await db
          .collection("users")
          .doc(user.email)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              var separatedString1 = doc.data();
              dispatch(
                loginSuccess({
                  name: separatedString1.name,
                  email: separatedString1.email,
                  url: separatedString1.url,
                  date: separatedString1.date,
                  lastname: separatedString1?.lastname,
                  size: separatedString1?.size,
                  stripe_id: separatedString1?.stripe_id,
                  gender: separatedString1?.gender,
                  phone: separatedString1?.phone,
                  country: separatedString1?.country,
                  state: separatedString1?.state,
                  postalCode: separatedString1?.postalCode,
                  city: separatedString1?.city,
                  referral: separatedString1?.referral,
                  street: separatedString1?.street,
                  isListed: separatedString1?.isListed
                    ? separatedString1?.isListed
                    : 0,
                  role: separatedString1.role,
                })
              );
            } else {
              dispatch(loginSuccess({}));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      // console.log("separatedString1");
    });
    return () => unsubscribe();
  }, [dispatch]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setLoading(true), 1000);
  }, []);
  return (
    <>
      {loading ? (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default wrapper.withRedux(MyApp);
