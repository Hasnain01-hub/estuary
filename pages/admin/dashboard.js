import { Pagination } from "antd";
import React from "react";
import Layout from "../../../components/layout/Layout";
import { Skeleton } from "antd";
import axios from "axios";
import { db } from "../../utils/Firebase";
import Link from "next/link";
import { sum } from "lodash";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";
import SeoHead from "../../components/SeoHead";
const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [total, setotal] = React.useState(0);
  const [loading, setloading] = React.useState(false);
  const [Senakers, setSenakers] = React.useState([]);
  const [totalsneak, setotalsneak] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [search, setsearch] = React.useState("");
  const [count, setcount] = React.useState();
  const [users, setusers] = React.useState([]);
  const [dupusers, setdupusers] = React.useState([]);
  // const [next_upd, setnext_upd] = React.useState([]);
  const getdat = async () => {
    const res = await axios.get(
      `https://sneaker-api-phi.vercel.app/getbuysneaker`
    );
    const getallsneaker = await axios.get(
      `https://sneaker-api-phi.vercel.app/getallsneaker`
    );
    // const next = await axios.get(
    //   `https://sneaker-api-phi.vercel.app/getTimenextUpadte`
    // );
    // setnext_upd(next.data);
    var dataallsneaker = getallsneaker.data;
    setotalsneak(dataallsneaker);
    dataallsneaker = dataallsneaker.filter((item) => item.show == false);
    //getallsneaker
    const data = await res.data;
    var arr = [];
    const metadata = data.map((item) => {
      const res = item.product.map((pro) => {
        return {
          name: item.user.name,
          phone: item.user.phone,
          email: item.user.email,
          spent: pro.discount_price,
          thumbnail: pro.thumbnail,
          shoeName: pro.shoeName,
          date: item.updatedAt,
        };
      });
      arr = arr.concat(res);
      return arr;
    });
    var final_result = metadata[metadata.length - 1];

    setotal(sum(final_result.map((i) => i.spent)));

    setSenakers(dataallsneaker);

    setloading(true);
  };
  const { user } = useSelector((state) => state.user);
  const onSearch = (e) => {
    e.preventDefault();
    setusers(
      dupusers.filter((s) =>
        s.email.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  React.useEffect(() => {
    if (user && user?.role == "admin") {
      return;
    } else {
      window.location.href = "/";
    }
  }, [user]);
  React.useEffect(() => {
    loadUsers();
    getdat();
    return () => {
      setusers([]);
    };
  }, [page]);
  const loadUsers = async () => {
    await db
      .collection("users")
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          //console.log(doc.id, " => ", doc.data());
          data.push(doc.data());
        });
        setdupusers(data);
        setcount(querySnapshot.size);
        setdupusers(data);
        if (page == 1) {
          setusers(data.slice(0, 8));
        } else {
          setusers(data.slice(8 * (page - 1), 8 * page));
        }
      });
  };
  return (
    <>
      <SeoHead title="Dashboard" />

      <Layout>
        <div className="w-full py-20 lg:py-24">
          <button
            onClick={() => setOpen(!open)}
            data-drawer-target="default-sidebar"
            data-drawer-toggle="default-sidebar"
            aria-controls="default-sidebar"
            type="button"
            className=" items-center  p-2 mt-3 ml-3 text-sm text-black-600 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          {loading ? (
            <div className="flex flex-nowrap">
              <div className="md:block">
                <aside
                  style={{
                    display: open ? "block" : "none",
                    position: open ? "absolute" : "relative",
                    borderRadius: open ? "15px" : "0px",
                    background: open ? "#fff" : "transparent",
                    "--tw-translate-x": open ? "0px" : "-100px",
                    transform: open
                      ? " translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"
                      : "none",
                    transitionProperty: "transform",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                    transitionDuration: "150ms",
                  }}
                  id="default-sidebar"
                  className=" z-40 w-64  transition-transform -translate-x-full sm:translate-x-0 hide"
                  aria-label="Sidebar"
                >
                  <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                      <li>
                        <Link
                          href="/admin/getbuyed"
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
                      {/* <li>
                      <Link
                        href="#"
                        className="flex items-center p-2 text-black-600 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                      >
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-black-600 transition duration-75 dark:text-gray-400 group-hover:text-black-600 dark:group-hover:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">
                          Inbox
                        </span>
                        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                          3
                        </span>
                      </Link>
                    </li> */}
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
              <div className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
                <div className="container px-6 py-8 mx-auto">
                  <div className="flex flex-col md:flex-row md:justify-between gap-2 md:gap-0">
                    <h3 className="text-3xl font-medium text-gray-700 ">
                      Dashboard
                    </h3>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap -mx-6">
                      <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                        <div
                          className="flex items-center px-5 py-6 bg-white rounded-md shadow"
                          style={{ background: "aliceblue" }}
                        >
                          <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                            <svg
                              className="w-8 h-8 text-white"
                              viewBox="0 0 28 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>

                          <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-gray-700">
                              {count}
                            </h4>
                            <div className="text-black-600">Total Users</div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                        <div
                          style={{ background: "aliceblue" }}
                          className="flex items-center px-5 py-6 bg-white rounded-md shadow"
                        >
                          <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                            <svg
                              className="w-8 h-8 text-white"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                                fill="currentColor"
                              ></path>
                              <path
                                d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                                fill="currentColor"
                              ></path>
                            </svg>
                          </div>

                          <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-gray-700">
                              ${Math.round(total)}
                            </h4>
                            <div className="text-black-600">Total Revenue</div>
                          </div>
                        </div>
                      </div>

                      <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                        <div
                          style={{ background: "aliceblue" }}
                          className="flex items-center px-5 py-6 bg-white rounded-md shadow"
                        >
                          <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                            <svg
                              className="w-8 h-8 text-white"
                              viewBox="0 0 28 28"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                                fill="currentColor"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linejoin="round"
                              ></path>
                              <path
                                d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                                stroke="currentColor"
                                stroke-width="2"
                              ></path>
                            </svg>
                          </div>

                          <div className="mx-5">
                            <h4 className="text-2xl font-semibold text-gray-700">
                              {Senakers.length}
                            </h4>
                            <div className="text-black-600">
                              Available Products
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8"></div>

                  <div className="flex flex-col mt-8">
                    <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                      <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                        <div className="searchinp">
                          <label
                            for="default-search"
                            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                          >
                            Search
                          </label>
                          <div className="relative">
                            <div
                              style={{
                                display: search.length > 0 ? "none" : "",
                              }}
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
                              style={{
                                background: "#fff",
                                borderRadius: "2rem",
                              }}
                              type="search"
                              value={search}
                              onKeyDown={(e) => {
                                if (e.key == "Enter") {
                                  onSearch(e);
                                }
                              }}
                              onChange={(e) => setsearch(e.target.value)}
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
                                setusers(dupusers);
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
                        <table className="min-w-full">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                                Name
                              </th>
                              <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                                Phone
                              </th>
                              <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                                Seller Status
                              </th>
                              <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                                Inventory
                              </th>
                              <th className="px-2 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                                Referral
                              </th>
                              <th className="px-4 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                                Role
                              </th>
                              {/* <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-revert text-black-600 uppercase border-b border-gray-200 bg-gray-50">
                            Edit
                          </th> */}
                            </tr>
                          </thead>

                          <tbody className="bg-white">
                            {users.map((item, idx) => {
                              return (
                                <tr>
                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <Link
                                      href={`/admin/userInventory?userEmail=${item.email}`}
                                    >
                                      <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                          <img
                                            className="w-10 h-10 rounded-full"
                                            referrerPolicy="no-referrer"
                                            src={
                                              item.url ??
                                              "https://api-private.atlassian.com/users/50b335ba706e5610e24fdea2b4af98f8/avatar"
                                            }
                                            alt=""
                                          />
                                        </div>

                                        <div className="ml-4">
                                          <div className="text-sm font-medium leading-5 text-gray-900">
                                            {item.name}
                                          </div>
                                          <div className="text-sm leading-5 text-black-600">
                                            {item.email}
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </td>

                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <div className="text-sm leading-5 text-gray-900">
                                      {item?.phone ?? "-"}
                                    </div>
                                    {/* <div className="text-sm leading-5 text-black-600">
                                  Web dev
                                </div> */}
                                  </td>

                                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                    <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                      {item?.stripe_id ? "Active" : "Inactive"}
                                    </span>
                                  </td>
                                  <td className="px-2 py-4 text-sm leading-5 text-black-600 whitespace-no-wrap border-b border-gray-200 text-center">
                                    {
                                      totalsneak.filter(
                                        (i) => i.email == item.email
                                      ).length
                                    }
                                  </td>
                                  <td className="px-6 py-4 text-sm leading-5 text-black-600 whitespace-no-wrap border-b border-gray-200">
                                    {item?.referral ?? "0"}
                                  </td>
                                  <td className="px-4 py-4 text-sm leading-5 text-black-600 whitespace-no-wrap border-b border-gray-200">
                                    {item.role}
                                  </td>

                                  {/* <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                                <a
                                  href="#"
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </a>
                              </td> */}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <Pagination
                          current={page}
                          onChange={(page) => setPage(page)}
                          total={Math.floor((count / 8) * 10)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Skeleton active />
          )}
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
