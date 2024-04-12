import React, { useState, useEffect } from "react";
import Link from "next/link";
// Import react scroll
import { Link as LinkScroll } from "react-scroll";
import ButtonOutline from "../misc/ButtonOutline.";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import logo from "../asset/logo.png";
import { auth } from "../../utils/Firebase";
import "remixicon/fonts/remixicon.css";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../reducer";
import CartPage from "../Cart";

const Header = () => {
  const [activeLink, setActiveLink] = useState(null);
  const [scrollActive, setScrollActive] = useState(false);
  const [clickcart, setcart] = useState(false);
  const [drop, setdrop] = useState(false);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const reduxDispatch = useDispatch();
  const handleLogout = async (e) => {
    e.preventDefault();
    await auth
      .signOut()
      .then(async () => {
        window.localStorage.removeItem("cart");
        reduxDispatch(logoutSuccess({}));
        toast.success("Logout Success");
        window.location.href = "/";
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: [],
        });
        // setUser(null);

        // setInterval(() => {
        //   window.location.reload();
        // }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollActive(window.scrollY > 20);
    });
  }, []);
  return (
    <>
      <header
        className={
          "fixed top-0 w-full  z-30 transition-all " +
          (scrollActive ? " shadow-md pt-0" : " pt-4")
        }
        style={{
          backdropFilter: "saturate(180%) blur(20px)",
          background: "rgba(251, 251, 253, .8)",
          // background: "rgba( 255, 255, 255, 0.1 )",
          // backdropFilter: "blur( 4px )",
        }}
      >
        <nav className="max-w-screen-xl px-6 sm:px-8 lg:px-16 mx-auto grid grid-flow-col py-3 sm:py-4">
          <div className="col-start-1 col-end-2 flex items-center">
            <Link href="/">
              <Image
                height={100}
                width={100}
                className=" w-100 h-50"
                src={logo}
              />
            </Link>
          </div>
          <ul className="hidden lg:flex col-start-4 col-end-8   items-center">
            <Link
              activeClass="active"
              // to="Machinery"
              href="/shop"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Machinery");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "Machinery"
                  ? " text-scolor animation-active "
                  : " text-black-900 hover:text-scolor ")
              }
            >
              Shop
            </Link>
            <Link
              activeClass="active"
              // to="Machinery"
              href="/sell"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Machinery");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "Machinery"
                  ? " text-scolor animation-active "
                  : " hover:text-scolor ")
              }
            >
              Sell
            </Link>
            <Link
              href="/about"
              // activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "about"
                  ? " text-scolor animation-active "
                  : "  hover:text-scolor a")
              }
            >
              About
            </Link>

            <Link
              activeClass="active"
              // to="Machinery"
              href="/help"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("Machinery");
              }}
              className={
                "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                (activeLink === "Machinery"
                  ? " text-scolor animation-active "
                  : "  hover:text-scolor ")
              }
            >
              Help
            </Link>

            {user && user.email ? (
              <Link
                activeClass="active"
                // to="testimoni"
                href="/profile/dashboard"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("testimoni");
                }}
                className={
                  "px-4 py-2 mx-2 cursor-pointer animation-hover inline-block relative" +
                  (activeLink === "testimoni"
                    ? " text-scolor animation-active "
                    : "  hover:text-scolor ")
                }
              >
                Dashboard
              </Link>
            ) : null}
          </ul>
          <div className="col-start-10 col-end-12 font-medium flex justify-end items-center">
            {!user && !user?.email ? (
              <ButtonOutline>
                <Link
                  className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-scolor transition-all"
                  href="/login"
                >
                  Login
                </Link>
              </ButtonOutline>
            ) : null}
            {user && user?.email ? (
              <div className="desktop-show">
                <button className="font-medium tracking-wide py-2 sm:px-4 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-primarycolor-500  ">
                  <Link
                    className="text-black-600 mx-0 capitalize tracking-wide hover:text-scolor transition-all "
                    href="/form/addsneaker"
                  >
                    Add Sneaker
                  </Link>
                </button>
              </div>
            ) : null}
            {user && user?.email ? (
              <Link
                className="text-black-600 mx-2 sm:mx-4 capitalize tracking-wide hover:text-scolor transition-all mobile-show"
                href="/form/addsneaker"
              >
                <span
                  style={{
                    fontSize: "30px",
                    cursor: "pointer",
                    color: "#00448f",
                  }}
                >
                  {" "}
                  <i className="ri-add-line"></i>
                </span>
              </Link>
            ) : null}

            {/* cart */}
            {/* <div
              onClick={(e) => {
                setcart(true);
              }}
            >
              <svg
                className="cartsvg"
                style={{
                  marginLeft: "5px",
                  width: "30px",
                  cursor: "pointer",
                  height: "25px",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                  fill="rgba(0,68,143,1)"
                ></path>
              </svg>
            </div> */}
            {user && user.email && (
              <div className="relative inline-block text-left">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setdrop((prev) => !prev);
                  }}
                >
                  <svg
                    className="cartsvg"
                    style={{
                      margin: "0px 1px",

                      width: "30px",
                      cursor: "pointer",
                      height: "25px",
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                      fill="rgba(0,68,143,1)"
                    ></path>
                  </svg>
                </div>
                <div
                  style={{
                    display: drop ? "block" : "none",
                    backdropFilter: "saturate(180%) blur(20px)",
                    background: "rgba(251, 251, 253, .8)",
                  }}
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="capitalize">
                      {(user && user.name) || "John"}&nbsp;
                      {(user && user.lastname) || ""}
                    </div>
                    {/* <div class="font-medium truncate border-b-2 border-gray-100">
                      {(user && user.email) || ""}
                    </div> */}
                  </div>
                  <div className="" role="none">
                    {/* <Link
                      href="/profile/user"
                      className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Profile
                    </Link> */}
                    {/* <Link
                      href="/profile/inventory"
                      className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Inventory
                    </Link> */}
                    {user && user.role == "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Admin
                      </Link>
                    )}
                    {/* {user && user.email && (
                      <Link
                        href="/profile/order"
                        className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Orders
                      </Link>
                    )} */}
                    <Link
                      href="/help"
                      className="mobile-show px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Help
                    </Link>
                    {/* {user && user.email && (
                      <Link
                        href="/profile/buyedproducts"
                        className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Buyed Products
                      </Link>
                    )} */}
                    {/* {user && user.email && (
                      <Link
                        href="/stripe-connect"
                        className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Seller Page
                      </Link>
                    )} */}
                    {/* {user && user.email && (
                      <Link
                        href="/form/addcheckcheck"
                        className=" block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Check check
                      </Link>
                    )} */}

                    <div
                      onClick={handleLogout}
                      className="cursor-pointer  block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </div>
                  </div>
                </div>
              </div>

              // </Link>
            )}
            {/* (
              <button
                onClick={handleLogout}
                className="font-medium tracking-wide py-2 px-5 sm:px-8 border border-orange-500 text-orange-500 bg-white-500 outline-none rounded-l-full rounded-r-full capitalize hover:bg-primarycolor-500 hover:text-primarycolor transition-all hover:shadow-scolor "
              >
                {" "}
                Logout
              </button>
            ) */}
          </div>
        </nav>
      </header>
      {/* Mobile Navigation */}

      <nav
        style={{ background: "white" }}
        className="fixed lg:hidden bottom-0 left-0 right-0 z-20 px-2 sm:px-8 shadow-t "
      >
        <div className="bg-grey sm:">
          <ul className="flex w-full justify-around items-center ">
            {/* home */}
            {/* <Link
              activeClass="active"
              href="/"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "mx-1 sm:mx-2  sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-scolor text-scolor"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
              >
                <path d="M19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001C20 20.5524 19.5523 21.0001 19 21.0001ZM6 19.0001H18V9.15757L12 3.70302L6 9.15757V19.0001Z"></path>
              </svg>
              Home
            </Link> */}
            {/* Shop */}
            <Link
              activeClass="active"
              //to="shop"
              href="/shop"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("shop");
              }}
              className={
                "mx-1 sm:mx-2 sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "shop"
                  ? "  border-scolor text-scolor"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Shop
              {/* </LinkScroll> */}
            </Link>

            <Link
              activeClass="active"
              // to="about"
              href="/sell"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "mx-1 sm:mx-2  sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-scolor text-scolor"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12.0049 22.0029C6.48204 22.0029 2.00488 17.5258 2.00488 12.0029C2.00488 6.48008 6.48204 2.00293 12.0049 2.00293C17.5277 2.00293 22.0049 6.48008 22.0049 12.0029C22.0049 17.5258 17.5277 22.0029 12.0049 22.0029ZM12.0049 20.0029C16.4232 20.0029 20.0049 16.4212 20.0049 12.0029C20.0049 7.58465 16.4232 4.00293 12.0049 4.00293C7.5866 4.00293 4.00488 7.58465 4.00488 12.0029C4.00488 16.4212 7.5866 20.0029 12.0049 20.0029ZM8.50488 14.0029H14.0049C14.281 14.0029 14.5049 13.7791 14.5049 13.5029C14.5049 13.2268 14.281 13.0029 14.0049 13.0029H10.0049C8.62417 13.0029 7.50488 11.8836 7.50488 10.5029C7.50488 9.12222 8.62417 8.00293 10.0049 8.00293H11.0049V6.00293H13.0049V8.00293H15.5049V10.0029H10.0049C9.72874 10.0029 9.50488 10.2268 9.50488 10.5029C9.50488 10.7791 9.72874 11.0029 10.0049 11.0029H14.0049C15.3856 11.0029 16.5049 12.1222 16.5049 13.5029C16.5049 14.8836 15.3856 16.0029 14.0049 16.0029H13.0049V18.0029H11.0049V16.0029H8.50488V14.0029Z"></path>
              </svg>
              Sell
            </Link>

            {/* about */}
            <Link
              activeClass="active"
              // to="about"
              href="/about"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("about");
              }}
              className={
                "mx-1 sm:mx-2  sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "about"
                  ? "  border-scolor text-scolor"
                  : " border-transparent")
              }
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M13.0605 8.11073L14.4747 9.52494C17.2084 12.2586 17.2084 16.6908 14.4747 19.4244L14.1211 19.778C11.3875 22.5117 6.95531 22.5117 4.22164 19.778C1.48797 17.0443 1.48797 12.6122 4.22164 9.87849L5.63585 11.2927C3.68323 13.2453 3.68323 16.4112 5.63585 18.3638C7.58847 20.3164 10.7543 20.3164 12.7069 18.3638L13.0605 18.0102C15.0131 16.0576 15.0131 12.8918 13.0605 10.9392L11.6463 9.52494L13.0605 8.11073ZM19.778 14.1211L18.3638 12.7069C20.3164 10.7543 20.3164 7.58847 18.3638 5.63585C16.4112 3.68323 13.2453 3.68323 11.2927 5.63585L10.9392 5.98941C8.98653 7.94203 8.98653 11.1079 10.9392 13.0605L12.3534 14.4747L10.9392 15.8889L9.52494 14.4747C6.79127 11.741 6.79127 7.30886 9.52494 4.57519L9.87849 4.22164C12.6122 1.48797 17.0443 1.48797 19.778 4.22164C22.5117 6.95531 22.5117 11.3875 19.778 14.1211Z"></path>
              </svg>
              About
            </Link>
            {/* help */}
            {/* <Link
              activeClass="active"
              href="/help"
              spy={true}
              smooth={true}
              duration={1000}
              onSetActive={() => {
                setActiveLink("shop");
              }}
              className={
                "mx-1 sm:mx-2  sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                (activeLink === "shop"
                  ? "  border-scolor text-scolor"
                  : " border-transparent ")
              }
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="12"
                height="12"
              >
                <path d="M19.9381 8H21C22.1046 8 23 8.89543 23 10V14C23 15.1046 22.1046 16 21 16H19.9381C19.446 19.9463 16.0796 23 12 23V21C15.3137 21 18 18.3137 18 15V9C18 5.68629 15.3137 3 12 3C8.68629 3 6 5.68629 6 9V16H3C1.89543 16 1 15.1046 1 14V10C1 8.89543 1.89543 8 3 8H4.06189C4.55399 4.05369 7.92038 1 12 1C16.0796 1 19.446 4.05369 19.9381 8ZM3 10V14H4V10H3ZM20 10V14H21V10H20ZM7.75944 15.7849L8.81958 14.0887C9.74161 14.6662 10.8318 15 12 15C13.1682 15 14.2584 14.6662 15.1804 14.0887L16.2406 15.7849C15.0112 16.5549 13.5576 17 12 17C10.4424 17 8.98882 16.5549 7.75944 15.7849Z"></path>
              </svg>
              Help
            </Link> */}

            {user && user.email ? (
              <Link
                activeClass="active"
                href="/profile/dashboard"
                spy={true}
                smooth={true}
                duration={1000}
                onSetActive={() => {
                  setActiveLink("testimoni");
                }}
                className={
                  "mx-1 sm:mx-2  sm:px-4 py-2 flex flex-col items-center text-xs border-t-2 transition-all " +
                  (activeLink === "testimoni"
                    ? "  border-scolor text-scolor"
                    : " border-transparent ")
                }
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z"></path>
                </svg>
                Dashboard
              </Link>
            ) : null}
          </ul>
        </div>
        <ToastContainer />
      </nav>
      {/* cart */}
      {/* {clickcart ? <CartPage setcart={setcart} clickcart={clickcart} /> : null} */}
      {/* End Mobile Navigation */}
    </>
  );
};

export default Header;
