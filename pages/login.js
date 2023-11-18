import React from "react";
import animation from "../components/asset/login-illustration.gif";
import Image from "next/image";
import logo from "../components/asset/esturay-logo.png";
import SeoHead from "../components/SeoHead";
import Link from "next/link";
import Layout from "../components/layout/Layout";
import firebase from "firebase/compat/app";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { auth, db } from "../utils/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSuccess } from "../reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const router = useRouter();
  const { referral } = router.query;
  const reduxDispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const signInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await db
        .collection("users")
        .doc(email)
        .get()
        .then(async (snapshot) => {
          if (snapshot && snapshot.exists) {
            var obj = snapshot.data();
            await auth
              .signInWithEmailAndPassword(email, password)
              .then((res) => {
                reduxDispatch(
                  loginSuccess({
                    name: email.split("@")[0],
                    email: email,
                    lastname: obj?.lastname,
                    gender: obj?.gender,
                    phone: obj?.phone,
                    country: obj?.country,
                    state: obj?.state,
                    postalCode: obj?.postalCode,
                    city: obj?.city,
                    street: obj?.street,
                    role: obj.role,
                    date: obj.date,
                    url: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                  })
                );
              });
            toast.success("successfully login");
            router.push("/");
          } else {
            toast.error("User not found");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user?.email) {
      window.location.href = "/";
    } else {
      return;
    }
  }, [user]);
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.signInWithPopup(googleProvider);
      const user = res.user;
      const idTokenResult = await user.getIdTokenResult();
      const date = new Date();
      await db
        .collection("users")
        .doc(user.email)
        .get()
        .then(async (doc) => {
          if (doc.exists) {
            var separatedString = doc.data();
            reduxDispatch(
              loginSuccess({
                name: separatedString.name,
                email: separatedString.email,
                role: separatedString.role,
                url: separatedString.url,
                lastname: separatedString?.lastname,
                gender: separatedString?.gender,
                phone: separatedString?.phone,
                country: separatedString?.country,
                state: separatedString?.state,
                postalCode: separatedString?.postalCode,
                city: separatedString?.city,
                street: separatedString?.street,
                date: separatedString.date,
                isListed: separatedString?.isListed,
                referral: separatedString?.referral,
              })
            );

            router.push("/");
          } else {
            if (referral != "" && referral != null && referral != undefined) {
              await db
                .collection("users")
                .doc(referral)
                .get()
                .then(async (doc) => {
                  await db
                    .collection("users")
                    .doc(referral)
                    .update({
                      referral: isNaN(doc.data()?.referral)
                        ? 1
                        : doc.data()?.referral + 1,
                    });
                });
            }
            await db
              .collection("users")
              .doc(user.email)
              .set({
                name: user.email.split("@")[0],
                role: "user",
                date: date.toDateString(),
                url:
                  user.photoURL ??
                  "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                email: user.email,
                referral: 0,
                isListed: 0,
              })
              .then(() => {
                reduxDispatch(
                  loginSuccess({
                    name: user.email.split("@")[0],
                    email: user.email,
                    date: date.toDateString(),
                    role: "user",
                    url:
                      user.photoURL ??
                      "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                    referral: 0,
                    isListed: 0,
                  })
                );

                router.push("/");
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .then(() => {
          toast.success("successfully login");
        });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <>
      {/* <SeoHead title="Login" /> */}
      <Layout>
        <div className="card max-w-screen-xl mx-auto py-20 lg:py-24">
          <div className="containerlogin" id="container">
            <div className="form-container sign-in-container">
              <form className="form-card" action="#">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                  {/* Esturay */}
                  <Image
                    src={logo}
                    height={200}
                    width={200}
                    className=" w-100 h-50"
                  />
                </h1>
                <div className="social-container"></div>
                <input
                  placeholder="email"
                  type="text"
                  id="inp"
                  value={email}
                  className="form-control"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  placeholder="password"
                  type="password"
                  id="inp"
                  value={password}
                  className="form-control"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  style={{
                    cursor: "pointer",
                    background: " #001968",

                    border: "1px solid #001968",
                  }}
                  className="mb-2 mt-2"
                  onClick={signInWithEmailAndPassword}
                >
                  Login
                </button>
                {/* <br /> */}

                <button
                  onClick={signInWithGoogle}
                  className="mb-2"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <GoogleOutlined />
                  &nbsp;Google
                </button>
                <span>
                  Don'nt have an account?
                  <Link
                    style={{ color: "#031a6c", fontWeight: "500" }}
                    href="/register"
                  >
                    {" "}
                    Signup
                  </Link>
                </span>
              </form>
            </div>
            <div className="smhide overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>

                  <button className="ghost" id="signIn">
                    Sign In
                  </button>
                </div>
                <div
                  className="overlay-panel overlay-right"
                  style={{ backgroundColor: "#3A4FAB" }}
                >
                  <Image
                    style={{
                      width: "100%",
                      backgroundSize: "contain",
                      backgroundPosition: "center center",
                      backgroundRepeat: "no - repeat",
                    }}
                    src={animation}
                  />
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
      </Layout>
    </>
  );
};

export default Login;
