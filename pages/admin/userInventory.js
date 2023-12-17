import { Pagination } from "antd";
import "remixicon/fonts/remixicon.css";
import React from "react";
import Layout from "../../components/Layout/Layout";
import AOS from "aos";
import "aos/dist/aos.css";
import { Popover } from "antd";
import axios from "axios";

import { Skeleton } from "antd";
import Link from "next/link";

import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import SeoHead from "../../components/SeoHead";
import { db } from "../../utils/Firebase";
import discountModal from "../../components/misc/discountModal";

const UserInventory = () => {
  const [senakers, setSenakers] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const router = useRouter();
  const { userEmail } = router.query;

  const [duplicatedata, setdata] = React.useState([]);

  const [search, setsearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [totalsold, settotalsold] = React.useState(0);
  const [listvalue, setlistvalue] = React.useState(0);
  const [total_prof, settotoal_prof] = React.useState(0);
  const [UserListed, setUserListed] = React.useState(5);
  const [count, setcount] = React.useState();

  //https://sneaker-api-phi.vercel.app/
  const getdat = async () => {
    if (userEmail) {
      setloading(false);
      const res = await axios.get(
        `https://sneaker-api-phi.vercel.app/getsneakerbyemail/${userEmail}`
      );
      const data = await res.data;
      //setSenakers(data);
      var total_profit = 0;
      data.map((p) => {
        if (p.sold) {
          total_profit -= p.discount_price - p.purchase;
          settotalsold((prev) => {
            return prev + 1;
          });
        }
        setlistvalue((prev) => {
          return prev + p.discount_price;
        });
        total_profit += p.discount_price - p.purchase;
      });
      settotoal_prof(total_profit);
      setdata(data);

      setcount(data.length);

      if (page == 1) {
        setSenakers(data.slice(0, 15));
      } else {
        setSenakers(data.slice(15 * (page - 1), 15 * page));
      }
      setloading(true);
    }
  };

  const getIsListed = async () => {
    await db
      .collection("users")
      .doc(userEmail)
      .get()
      .then(async (doc) => {
        if (doc.exists) {
          const data = await doc.data();
          setUserListed(data.isListed);
        } else {
          setUserListed(5);
        }
      });
  };
  React.useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
    getdat();
    getIsListed();
    return () => {
      settotalsold(0);
      setlistvalue(0);
    };
  }, [userEmail, page]);

  const onSearch = (e) => {
    e.preventDefault();
    setSenakers(
      duplicatedata.filter((s) =>
        s.shoeName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <>
      <SeoHead title="UserInventory" />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <div className="w-full mx-auto bg-white shadow-lg rounded-sm ">
            <header
              style={{ alignItems: "center" }}
              className="px-5 py-4 border-b justify-center border-gray-100 flex flex-row sm:justify-between flex-wrap "
            >
              <div className="flex flex-row md:flex-col justify-between md:gap-0 gap-5">
                <h2 className="font-semibold text-gray-800 md:text-justify text-center">
                  Total sold: {totalsold}
                </h2>

                <h2 className="font-semibold text-gray-800 md:text-justify text-center">
                  List value: ${Math.round(listvalue)}
                </h2>
                <h2 className="font-semibold text-gray-800 md:text-justify text-center">
                  Total profit: ${Math.round(total_prof)}
                </h2>
              </div>

              <div className="searchinp">
                <label
                  for="default-search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="relative">
                  <div
                    style={{ display: search.length > 0 ? "none" : "" }}
                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    style={{ background: "#fff", borderRadius: "2rem" }}
                    type="search"
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        onSearch(e);
                      }
                    }}
                    id="default-search"
                    className="block  p-4 pl-10 text-sm text-scolor border border-gray-300   focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-scolor dark:text-scolor dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="     Search..."
                  />
                  <i
                    style={{ fontSize: "20px" }}
                    className="ri-close-fill absolute right-24 top-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setsearch("");
                      setSenakers(duplicatedata);
                    }}
                  ></i>

                  <button
                    type="submit"
                    style={{ right: "0.2rem", borderRadius: "2rem" }}
                    onClick={onSearch}
                    className="text-white absolute  bottom-1.5 bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Search
                  </button>
                </div>
              </div>

              {/* <h2 className="font-semibold text-gray-800">
                Total Revenue: ${Math.round(total)}
              </h2> */}
            </header>
            {loading ? (
              <div className="p-3">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      <tr>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">No</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">SKU</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">
                            LIST PRICE
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <Popover
                            content={`Seller profit = List Price - Fees - Purchase Price Your fee is currently ${
                              UserListed > 50 ? 0 : discountModal[UserListed]
                            }%`}
                            // title="Title"
                          >
                            <div className="font-semibold text-left flex flex-row gap-1 items-center">
                              Profit{" "}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="20"
                              >
                                <path
                                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z"
                                  fill="rgba(1,25,104,1)"
                                ></path>
                              </svg>
                            </div>
                          </Popover>
                        </th>
                        <th className="p-2 whitespace-nowrap ">
                          <div className="font-semibold text-left ">
                            Purchase PRICE
                          </div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-left">Status</div>
                        </th>
                        <th className="p-2 whitespace-nowrap">
                          <div className="font-semibold text-center">SIZE</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                      {senakers.length > 0 ? (
                        senakers &&
                        senakers.map((p, ind) => {
                          return (
                            <tr style={{ background: p.show ? "#f1eded" : "" }}>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">{ind + 1}</div>
                              </td>
                              <Link href={`/Product/${p._id}`}>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                      <img
                                        className="rounded-full"
                                        src={p.thumbnail}
                                        width="40"
                                        height="40"
                                        alt="Alex Shatov"
                                      />
                                    </div>
                                    <div className="font-medium text-gray-800">
                                      {p.shoeName}
                                    </div>
                                  </div>
                                </td>
                              </Link>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-left">{p.styleID}</div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center">
                                  ${Math.round(p.discount_price)}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div
                                  style={{
                                    color:
                                      p.discount_price -
                                        (p.discount_price / 100) *
                                          discountModal[
                                            UserListed > 50 ? 50 : UserListed
                                          ] <=
                                      p?.purchase
                                        ? "red"
                                        : "green",
                                  }}
                                  className="text-lg text-center"
                                >
                                  {Math.round(
                                    p.discount_price -
                                      (p.discount_price / 100) *
                                        discountModal[
                                          UserListed > 50 ? 50 : UserListed
                                        ] -
                                      p.purchase
                                  ) > 0
                                    ? "$" +
                                      Math.round(
                                        p.discount_price -
                                          (p.discount_price / 100) *
                                            discountModal[
                                              UserListed > 50 ? 50 : UserListed
                                            ] -
                                          p.purchase
                                      )
                                    : "-$" +
                                      Math.abs(
                                        Math.round(
                                          p.discount_price -
                                            (p.discount_price / 100) *
                                              discountModal[
                                                UserListed > 50
                                                  ? 50
                                                  : UserListed
                                              ] -
                                            p.purchase
                                        )
                                      )}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center flex items-center gap-1">
                                  ${Math.round(p?.purchase)}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center">
                                  {p?.sold ? (
                                    <span style={{ color: "green" }}>Sold</span>
                                  ) : p.show ? (
                                    "Hidden"
                                  ) : (
                                    "Listed"
                                  )}
                                </div>
                              </td>
                              <td className="p-2 whitespace-nowrap">
                                <div className="text-lg text-center">
                                  {p.size}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <h2 className="font-semibold text-gray-800 text-center">
                          No Sneakers Added
                        </h2>
                      )}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  current={page}
                  onChange={(page) => setPage(page)}
                  total={Math.floor((count / 15) * 10)}
                />
              </div>
            ) : (
              <div className="px-20 lg:px-24">
                <div
                  id="shop"
                  className="displaygrid justify-center"
                  style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
                >
                  <Skeleton active />
                </div>
              </div>
            )}
          </div>
          <ToastContainer />
        </div>
      </Layout>
    </>
  );
};

export default UserInventory;
