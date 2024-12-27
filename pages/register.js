import React from "react";
import animation from "../components/asset/login-illustration.gif";
import Image from "next/image";
import logo from "../components/asset/esturay-logo.png";
import Link from "next/link";
import SeoHead from "../components/SeoHead";
import Layout from "../components/layout/Layout";
import { MailOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { auth, db } from "../utils/Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user?.email) {
      window.location.href = "/";
    } else {
      return;
    }
  }, [user]);
  const registerWithEmailAndPassword = async (e) => {
    e.preventDefault();
    const doc = await db.collection("users").doc(email).get();
    if (doc.exists) {
      toast.error("Email already exists");
      return;
    }
    const data = {
      email: email,
    };
    //https://esturay-client.vercel.app/
    const config = {
      url: "https://www.estuaryshoes.com/completesignup",
      handleCodeInApp: true,
    };

    await auth.sendSignInLinkToEmail(email, config);

    toast.success(
      `Email is sent to ${email} Click the link to complete your Registration, also check Junk folder`
    );
    window.localStorage.setItem("emailForRegistration", JSON.stringify(data));
    setEmail("");

    //window.location.reload();
  };

  return (
    <>
      <SeoHead title="Register" />
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
                <button
                  style={{
                    cursor: "pointer",
                    background: "#001968",
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid #001968",
                  }}
                  className="mb-2 mt-2"
                  onClick={registerWithEmailAndPassword}
                >
                  <MailOutlined />
                  &nbsp; &nbsp; Signup
                </button>
                {/* <br /> */}

                <span>
                  Already have an account?
                  <Link
                    style={{ color: "#001968", fontWeight: "500" }}
                    href="/login"
                  >
                    {" "}
                    Login
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
