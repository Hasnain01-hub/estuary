import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as _ from "lodash";
import discountModal from "../components/misc/discountModal";
import { db } from "../utils/Firebase";
const CartPage = (props) => {
  const dispatch = useDispatch();
  //background-color: rgb(221 221 221 / var(--tw-bg-opacity));
  const [load, setload] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const [Listed, setListed] = React.useState([]);
  const [cartitem, setcartitem] = React.useState(cart);
  const getListed = async () => {
    if (cart.length > 0) {
      cart.map(async (item) => {
        await db
          .collection("users")
          .doc(item.email)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setListed((prev) => [
                ...prev,
                discountModal[doc.data()?.isListed],
              ]);
            }
          });
      });
    }
  };
  React.useEffect(() => {
    getListed();
  }, [cart]);
  const placeorder = async (e, index) => {
    e.preventDefault();
    var cartitem = [...cart];
    cartitem.splice(index, 1);

    setListed(
      Listed.filter((item, idx) => {
        return idx != index;
      })
    );

    // localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("cart", JSON.stringify(cartitem));
    setcartitem(cartitem);
    dispatch({
      type: "ADD_TO_CART",
      payload: cartitem,
    });
  };
  var price = 0;

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey);
  const checkpayment = async (e) => {
    e.preventDefault();
    setload(true);
    if (user && user.email) {
      const stripe = await stripePromise;
      await axios
        .post("https://sneaker-api-phi.vercel.app/buysneaker", {
          product: cartitem,
          user: user,
          fee: Listed,
          prod_status: cartitem.map((item, idx) => {
            return { status: "Confirm Order", id: idx };
          }),
          total_price: price,
        })
        .then(async (id) => {
          console.log("id", id);
          const checkoutSession = await axios.post(
            "/api/create-stripe-session",
            {
              item: cartitem,
              _id: id,
              email: user.email,
              productId: cartitem.map((item, idx) => item._id),
              price: price,
            }
          );
          const result = await stripe.redirectToCheckout({
            sessionId: checkoutSession.data.id,
          });
          setload(false);
          // localStorage.setItem("cart", JSON.stringify([]));
          if (result.error) {
            toast.error(result.error.message);
          }
        });
      //api call to server to store data and get the doc id and sent to stripe, if cancel then delete the doc
    } else {
      toast.error("Please Login to continue");
    }
  };
  return (
    <>
      <div
        className="relative z-12"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{ backgorund: props.clickcart ? "grey" : "" }}
          className="fixed inset-0  bg-opacity-75 transition-opacity"
        ></div>
        <div>
          <div
            style={{
              display: props.clickcart ? "auto" : "none",
              zIndex: "100",
            }}
            className="fixed inset-0 overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div
                style={{
                  top: "80px",
                  bottom: "0px",
                }}
                className="pointer-events-none fixed  right-0 flex max-w-full pl-10"
              >
                <div className="pointer-events-auto w-screen max-w-md">
                  <div
                    style={{ background: "white", borderRadius: "10px" }}
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          className="text-lg font-medium text-gray-900"
                          id="slide-over-title"
                        >
                          Shopping cart
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              onClick={(e) => {
                                props.setcart(false);
                              }}
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {cartitem.length > 0 ? (
                              cartitem &&
                              cartitem.map((item, ind) => {
                                price += Math.round(item.discount_price);
                                return (
                                  <li className="flex py-6">
                                    <div
                                      style={{ height: "60px" }}
                                      className=" w-24 flex-shrink-0 overflow-hidden rounded-md "
                                    >
                                      <img
                                        src={item.thumbnail}
                                        alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a href="#">{item.shoeName}</a>
                                          </h3>
                                          <p className="ml-4">
                                            ${Math.round(item.discount_price)}
                                          </p>
                                        </div>
                                        <p className="mt-1 text-sm ">
                                          {item.brand}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p>size {item.size}</p>
                                        {/* <p>count {item.count}</p> */}

                                        <div className="flex">
                                          <button
                                            type="button"
                                            onClick={(e) => placeorder(e, ind)}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })
                            ) : (
                              <p className=" text-center mt-0.5 text-sm text-gray-900">
                                No items in cart
                              </p>
                            )}
                            {/* <li className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg"
                                alt="Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href="#">Medium Stuff Satchel</a>
                                  </h3>
                                  <p className="ml-4">$32.00</p>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">Blue</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">Qty 1</p>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li> */}

                            {/* <!-- More products... --> */}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>${price}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-900">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <span
                          // href="#"
                          onClick={checkpayment}
                          className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          {!load ? (
                            <span>Checkout</span>
                          ) : (
                            <span>Redirecting...</span>
                          )}
                        </span>
                      </div>
                      <Link href="/shop">
                        <div
                          //   onClick={props.setcart(false)}
                          className="mt-6 flex justify-center text-center text-sm text-gray-500"
                        >
                          <p>
                            or&nbsp;
                            <button
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
