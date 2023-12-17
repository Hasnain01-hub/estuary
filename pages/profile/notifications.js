import Link from "next/link";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import UpperButton from "../../components/sidebar/Button.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import { Checkbox, Divider } from "antd";
import Layout from "../../components/Layout/Layout.js";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { set } from "lodash";
import SeoHead from "../../components/SeoHead.js";
const CheckboxGroup = Checkbox.Group;
const Mail = () => {
  const [search, onSearch] = useState("");
  const [open, setOpen] = React.useState(false);
  const [dupmail, setdupmail] = React.useState([]);
  const [handleid, sethandleid] = React.useState([]);
  const [count, setcount] = React.useState(0);
  const [loading, setloading] = useState(false);
  const [page, setPage] = React.useState(1);
  const [mails, setmails] = React.useState([]);
  const { user } = useSelector((state) => state.user);
  const [checkedList, setCheckedList] = React.useState(handleid);
  const checkAll = handleid.length === checkedList.length;
  const indeterminate =
    checkedList.length > 0 && checkedList.length < handleid.length;
  const onCheckAllChange = (e) => {
    setCheckedList(e.target.checked ? handleid : []);
  };
  const getMails = async (user) => {
    await axios
      .get(`https://sneaker-api-phi.vercel.app/get-mail/${user.email}`)
      .then((res) => {
        if (res.data.length > 0) {
          if (page == 1) {
            setmails(res.data.slice(0, 8));
          } else {
            setmails(res.data.slice((page - 1) * 8, page * 8));
          }
          setdupmail(res.data);
          setcount(res.data.length);
          sethandleid(res.data.map((item) => item._id));
        } else {
          setmails([]);
          sethandleid([]);
        }
      });
    setloading(true);
  };
  useEffect(() => {
    if (user) {
      getMails(user);
    }
  }, [user, page]);
  const onChange = (list) => {
    if (checkedList.includes(list[0])) {
      setCheckedList(checkedList.filter((item) => !list[0].includes(item)));
    } else {
      setCheckedList((prev) => prev.concat(list));
    }

    // duplicatedata.filter((item) => list.includes(item._id)));
  };
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const handle_multi_remove = async (e) => {
    e.preventDefault();
    if (checkedList.length == 0) {
      toast.error("Please select a mail");
      return;
    }
    if (window.confirm("Are you sure you want to delete the mail?")) {
      await axios
        .post("https://sneaker-api-phi.vercel.app/delete-mail", {
          id: checkedList,
        })
        .then((res) => {
          if (res.status == 200) {
            getMails(user);
            setCheckedList([]);
            toast.success("Mail deleted successfully");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const setsearch = (e) => {
    e.preventDefault();

    setmails(
      dupmail.filter((item) =>
        item.subject.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  return (
    <>
      <SeoHead title="Notifications" />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap overflow-auto">
            <Sidebar open={open} />
            <div className="flex-1  bg-gray-200">
              <div className="container mx-auto">
                <div className="flex flex-col mt-8">
                  <div className="py-2 overflow-x-auto  sm:px-6  lg:px-8">
                    <div className="inline-block min-w-full overflow-hidden align-middle  shadow sm:rounded-lg">
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
                              border: "0.1px solid #868686",
                            }}
                            type="search"
                            value={search}
                            onKeyDown={(e) => {
                              if (e.key == "Enter") {
                                setsearch(e);
                              }
                            }}
                            onChange={(e) => onSearch(e.target.value)}
                            id="default-search"
                            className="block  p-4 pl-10 text-sm text-scolor border border-gray-300   focus:ring-blue-500 focus:border-blue-500  dark:border-gray-600 dark:placeholder-scolor dark:text-scolor dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="     Search..."
                          />
                          <i
                            style={{ fontSize: "20px" }}
                            className="ri-close-fill absolute right-24 top-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              onSearch("");
                              setmails(dupmail);
                            }}
                          ></i>
                          <button
                            type="submit"
                            style={{
                              right: "0.2rem",
                              borderRadius: "2rem",
                              bottom: "5px",
                            }}
                            onClick={setsearch}
                            className="text-white absolute  bottom-1.5 bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Search
                          </button>
                        </div>
                      </div>
                      <Divider />
                      <div>
                        {!loading ? (
                          <div className="flex items-center justify-center w-full h-screen">
                            <Spin
                              indicator={
                                <LoadingOutlined
                                  style={{
                                    fontSize: 50,
                                  }}
                                  spin
                                />
                              }
                            />
                          </div>
                        ) : (
                          <table className="min-w-full">
                            <thead className="flex flex-row justify-between">
                              <th className="p-2 whitespace-nowrap">
                                <div className="font-semibold text-left">
                                  <Checkbox
                                    indeterminate={indeterminate}
                                    onChange={onCheckAllChange}
                                    checked={checkAll}
                                  >
                                    {/* Check all */}
                                  </Checkbox>
                                </div>
                              </th>
                              <th className="p-2 whitespace-nowrap">
                                <div
                                  onClick={(e) => {
                                    checkedList.length <= 0
                                      ? toast.error("Please select a mail")
                                      : handle_multi_remove(e);
                                  }}
                                  className="text-lg text-center cursor-pointer mr-2"
                                >
                                  <i
                                    style={{
                                      color:
                                        checkedList.length <= 0
                                          ? "#ccc"
                                          : "#000",
                                    }}
                                    className="ri-delete-bin-line custumbt"
                                  ></i>
                                </div>
                              </th>
                            </thead>
                            <tbody className="bg-white">
                              {mails.length == 0 ? (
                                <center>
                                  <h1> 0 Mails in Inbox</h1>
                                </center>
                              ) : (
                                mails.map((item, ind) => {
                                  return (
                                    <tr
                                      style={{
                                        alignItems: "center",
                                        display: "flex",
                                      }}
                                    >
                                      <td className="p-2 whitespace-nowrap inventory">
                                        <CheckboxGroup
                                          options={[handleid[ind]]}
                                          value={checkedList}
                                          onChange={() =>
                                            onChange([handleid[ind]])
                                          }
                                        />
                                      </td>
                                      <td className="md:px-6 px-1 py-4 whitespace-no-wrap ">
                                        <Link
                                          href={`/profile/mailbody?id=${item._id}`}
                                        >
                                          <div className="flex items-center">
                                            <div className="flex-shrink-0 w-10 h-10">
                                              <img
                                                className="w-10 h-10 rounded-full"
                                                referrerPolicy="no-referrer"
                                                src={
                                                  // item.url ??
                                                  user?.url ??
                                                  "https://api-private.atlassian.com/users/50b335ba706e5610e24fdea2b4af98f8/avatar"
                                                }
                                                alt=""
                                              />
                                            </div>

                                            <div className="md:ml-4 ml-1">
                                              <div className="text-sm font-medium leading-5 text-gray-900">
                                                {/* {item.name} */}
                                                {user.name}
                                              </div>
                                              <div className="text-sm leading-5 text-black-600 none sm:block">
                                                {user.email}
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                      </td>

                                      <td
                                        style={{
                                          flex: "1 1 100%",
                                        }}
                                        className="md:px-6 px-2 py-4 whitespace-no-wrap "
                                      >
                                        <div className="text-1xl text-black-600 leading-normal">
                                          {/* {item?.subject ?? "-"} */}
                                          {item?.subject.length > 35
                                            ? item?.subject.substr(0, 35) +
                                              "..."
                                            : item?.subject ?? "-"}
                                        </div>
                                      </td>
                                      <td className="md:px-6 px-2 py-4 whitespace-no-wrap ">
                                        {new Date(item.date).toLocaleDateString(
                                          "en-US",
                                          options
                                        )}
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                              <Pagination
                                current={page}
                                onChange={(page) => setPage(page)}
                                total={Math.floor((count / 8) * 10)}
                              />
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Mail;
