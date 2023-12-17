import logo from "../components/asset/esturay-logo.png";
import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../utils/Firebase";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/Layout/Layout";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user?.email) {
      window.location.href = "/";
    } else {
      return;
    }
  }, [user]);
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    const config = {
      url: "https://www.estuaryshoes.com/",
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmail("");
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        toast.error("Invalid Email");
      });
  };
  return (
    <>
      <Layout>
        <div className="card max-w-screen-xl mx-auto py-20 lg:py-24">
          <div
            className="containerlogin"
            id="container"
            style={{
              width: "330px",
              maxWidth: "100%",
              minHeight: "390px",
            }}
          >
            <div>
              <form className="form-card" action="#">
                <h1 className="text-3xl lg:text-4xl xl:text-5xl font-medium text-black-600 leading-normal">
                  {/* Esturay */}
                  <Image
                    src={logo}
                    alt="Picture of the author"
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
                    background: " #001968",

                    border: "1px solid #001968",
                  }}
                  className="mb-2 mt-2"
                  onClick={handleForgetPassword}
                >
                  Recover
                </button>
                {/* <br /> */}

                <span>
                  Do you have an account?
                  <Link
                    style={{ color: "#031a6c", fontWeight: "500" }}
                    href="/login"
                  >
                    {" "}
                    Login
                  </Link>
                </span>
              </form>
            </div>
          </div>
          <ToastContainer />
        </div>
      </Layout>
    </>
  );
};

export default ForgetPassword;
