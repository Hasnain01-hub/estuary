import React from "react";
import animation from "../components/asset/login-illustration.gif";
import Image from "next/image";
import logo from "../components/asset/esturay-logo.png";
import Layout from "../components/Layout/Layout";
import { useRouter } from "next/router";
import { auth, db } from "../utils/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../reducer";
const CompleteSignup = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const reduxDispatch = useDispatch();
  React.useEffect(() => {
    setEmail(JSON.parse(window.localStorage.getItem("emailForRegistration")));
  }, []);
  const registerWithEmailAndPassword = async (e) => {
    e.preventDefault();
    if (!email.email || !password) {
      toast.error("Password is required");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email.email,
        window.location.href
      );
      if (result.user.emailVerified) {
        let user = auth.currentUser;
        await user.updatePassword(password);
        // const idTokenResult = await user.getIdTokenResult();
        const date = new Date();

        await db
          .collection("users")
          .doc(email.email)
          .set({
            name: email.email.split("@")[0],
            role: "user",
            date: date.toDateString(),
            email: email.email,
            url: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
            referral: 0,
            isListed: 0,
          })
          .then(async () => {
            reduxDispatch(
              loginSuccess({
                name: email.email.split("@")[0],
                email: email.email,
                date: date.toDateString(),
                role: "user",
                url: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
                referral: 0,
                isListed: 0,
              })
            );

            window.localStorage.removeItem("emailForRegistration");
            toast.success("successfully Register");
            router.push("/");
          })
          .catch();
        // history.push("/");
      }
    } catch (err) {
      console.error(err);
      toast.error("Token expired!, Please try again");
    }
  };
  return (
    <>
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
                  placeholder="password"
                  type="password"
                  id="inp"
                  className="form-control"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  style={{
                    cursor: "pointer",
                    background: "#001968",
                    border: "1px solid #001968",
                  }}
                  className="mb-2 mt-2"
                  onClick={registerWithEmailAndPassword}
                >
                  Complete Signup
                </button>
                {/* <br /> */}
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

export default CompleteSignup;
