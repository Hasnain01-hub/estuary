import { Pagination } from "antd";
import React from "react";
import Layout from "../../components/layout/Layout";
import { Skeleton } from "antd";
import Link from "next/link";
import axios from "axios";
import { sum } from "lodash";
import { useSelector } from "react-redux";
import SeoHead from "../../components/SeoHead";
import { toast, ToastContainer } from "react-toastify";
const Getbuyed = () => {
  const [senakers, setSenakers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setcount] = React.useState();
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const [loading, setloading] = React.useState(false);
  const [total, setotal] = React.useState(0);
  const { user } = useSelector((state) => state.user);
  React.useEffect(() => {
    if (user && user?.role == "admin") {
      return;
    } else {
      window.location.href = "/";
    }
  }, [user]);
  const getdat = async () => {
    const res = await axios.get(
      `https://sneaker-api-phi.vercel.app/getbuysneaker`
    );
    const data = await res.data;
    var arr = [];
    const metadata = data.map((item) => {
      const res = item.product.map((pro, idx) => {
        return {
          id: item._id,
          name: item.user.name,
          no: idx,
          payed_seller: item.payed_seller,
          phone: item.user.phone,
          email: item.user.email,
          seller_email: pro.email,
          cancel: item.cancel,
          fee: item.fee,
          spent: pro.discount_price,
          thumbnail: pro.thumbnail,
          shoeName: pro.shoeName,
          date: item.timestamp,
        };
      });
      arr = arr.concat(res);
      return arr;
    });
    var final_result = metadata[metadata.length - 1];
    setcount(final_result?.length);
    setotal(sum(final_result.map((i) => i.spent)));

    if (page == 1) {
      setSenakers(final_result?.slice(0, 8));
    } else {
      setSenakers(final_result?.slice(8 * (page - 1), 8 * page));
    }
    setloading(true);
  };
  React.useEffect(() => {
    getdat();
  }, [page]);
  const [open, setOpen] = React.useState(false);
  const handle_seller_payed = async (e, id, ind, no) => {
    e.preventDefault();
    const { value } = e.target;
    senakers[ind].payed_seller[no]["payed"] = value;
    // senakers.map((item) => {
    //   if (item.id == id) {
    //     item.payed_seller[item.no]["payed"] = value;
    //   }
    // });
    //https://sneaker-api-phi.vercel.app/
    await axios.post(`https://sneaker-api-phi.vercel.app/sellerpayed`, {
      id: id,
      no: no,
      value: senakers[ind].payed_seller,
    });
    setSenakers(senakers);
    toast.success("Seller Payed Updated");
  };

  return (
    <>
      <SeoHead />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <button
            onClick={() => setOpen(!open)}
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className=" items-center  p-2 mt-2 ml-3 text-sm text-black-600 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
          <div className="flex flex-nowrap">
            <div className="md:block">
              <aside
                style={{
                  display: open ? "block" : "none",
                  position: open ? "absolute" : "relative",
                  borderRadius: open ? "15px" : "0px",
                  background: open ? "#fff" : "transparent",
                  "--tw-translate-x": open ? "0px" : "0",
                  transform: open
                    ? " translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
                    : "none",
                }}
                id="default-sidebar"
                className=" z-40 w-64  transition-transform -translate-x-full sm:translate-x-0 hide"
                aria-label="Sidebar"
              >
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                  <ul className="space-y-2 font-medium">
                    <li>
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 21"
                        >
                          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span className="ml-3">Dashboard</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/contactdata"
                        className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 18"
                        >
                          <path d="M19 7H24V9H19V7ZM17 12H24V14H17V12ZM20 17H24V19H20V17ZM2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H16C16 18.6863 13.3137 16 10 16C6.68629 16 4 18.6863 4 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM10 11C12.21 11 14 9.21 14 7C14 4.79 12.21 3 10 3C7.79 3 6 4.79 6 7C6 9.21 7.79 11 10 11Z"></path>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Contact
                        </span>
                        {/* <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                          Pro
                        </span> */}
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="/admin/getbuyed"
                        className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 18"
                        >
                          <path d="M21 11.6458V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V11.6458C2.37764 10.9407 2 10.0144 2 9V3C2 2.44772 2.44772 2 3 2H21C21.5523 2 22 2.44772 22 3V9C22 10.0144 21.6224 10.9407 21 11.6458ZM19 12.874C18.6804 12.9562 18.3453 13 18 13C16.8053 13 15.7329 12.4762 15 11.6458C14.2671 12.4762 13.1947 13 12 13C10.8053 13 9.73294 12.4762 9 11.6458C8.26706 12.4762 7.19469 13 6 13C5.6547 13 5.31962 12.9562 5 12.874V20H19V12.874ZM14 9C14 8.44772 14.4477 8 15 8C15.5523 8 16 8.44772 16 9C16 10.1046 16.8954 11 18 11C19.1046 11 20 10.1046 20 9V4H4V9C4 10.1046 4.89543 11 6 11C7.10457 11 8 10.1046 8 9C8 8.44772 8.44772 8 9 8C9.55228 8 10 8.44772 10 9C10 10.1046 10.8954 11 12 11C13.1046 11 14 10.1046 14 9Z"></path>
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Orders
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </aside>
            </div>
            <div className="w-full md:w-4/5 mx-auto bg-white shadow-lg rounded-sm ">
              <header className="px-5 py-4 border-b border-gray-100 flex flex-row justify-between flex-wrap">
                <h2 className="font-semibold text-gray-800">Sneakers Buyed</h2>
                <h2 className="font-semibold text-gray-800">
                  Total Revenue: ${Math.round(total)}
                </h2>
              </header>
              {loading ? (
                <div className="p-1 ">
                  <div className="overflow-x-auto ">
                    <table className="table-auto w-full md:w-auto ">
                      <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                        <tr>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">No</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Name</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Buyer</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Total</div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">
                              Canceled
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">Fees</div>
                          </th>

                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Phone
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Seller email
                            </div>
                          </th>

                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Date
                            </div>
                          </th>
                          <th className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-center">
                              Seller Payed
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-sm divide-y divide-gray-100">
                        {senakers &&
                          senakers.map((p, ind) => {
                            return (
                              <tr>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{ind + 1}</div>
                                </td>
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
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">{p.email}</div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left font-medium text-green-500">
                                    ${Math.round(p.spent)}
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left font-medium text-green-500">
                                    {p.cancel[p.no] ? (
                                      <span style={{ color: "#AA0000" }}>
                                        Yes
                                      </span>
                                    ) : (
                                      <span>No</span>
                                    )}
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left font-medium text-green-500">
                                    {p?.fee[p.no] +
                                      "% ($" +
                                      Math.round(
                                        (p.spent * p?.fee[p.no]) / 100
                                      ) +
                                      ")"}
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-lg text-center">
                                    {p.phone}
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-left">
                                    {p.seller_email}
                                  </div>
                                </td>

                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-lg text-center">
                                    {new Date(p.date).toLocaleDateString(
                                      "en-US",
                                      options
                                    )}
                                  </div>
                                </td>
                                <td className="p-2 whitespace-nowrap">
                                  <div className="text-lg text-center">
                                    <select
                                      onChange={(e) =>
                                        handle_seller_payed(e, p.id, ind, p.no)
                                      }
                                    >
                                      <option
                                        value={p.payed_seller[p.no]["payed"]}
                                      >
                                        {p.payed_seller[p.no]["payed"]}
                                      </option>
                                      {p.payed_seller[p.no]["payed"] == "NO" ? (
                                        <option value="YES">Yes</option>
                                      ) : (
                                        <option value="NO">No</option>
                                      )}
                                    </select>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  <Pagination
                    current={page}
                    onChange={(page) => setPage(page)}
                    total={Math.floor((count / 8) * 10)}
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
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Getbuyed;
