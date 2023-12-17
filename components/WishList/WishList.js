import Link from "next/link";
import React from "react";
import WishSelect from "./WishSelect";
import SizeSelect from "./SelectSize";

const WishList = (props) => {
  return (
    <>
      <div
        className="relative z-12"
        aria-labelledby="slide-over-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          style={{ backgorund: props.clickmenu ? "grey" : "" }}
          className="fixed inset-0  bg-opacity-75 transition-opacity"
        ></div>
        <div>
          <div
            style={{
              display: props.clickmenu ? "auto" : "none",
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
                          WishList
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Close panel</span>
                            <svg
                              onClick={(e) => {
                                props.setmenu(false);
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
                          <WishSelect
                            setwish={props.setwish}
                            wish={props.wish}
                          />
                        </div>
                        <div className="flow-root mt-4">
                          <SizeSelect
                            setsize={props.setsize}
                            size={props.size}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                      {/* <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-900">
                        Shipping and taxes calculated at checkout.
                      </p> */}
                      <div
                        onClick={(e) => props.handleadd(e)}
                        className="mt-2 text-center mx-auto text-white mb-2 rounded-lg cursor-pointer bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-2/4"
                      >
                        <span
                        // href="#"
                        >
                          <span>Add</span>
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

export default WishList;
