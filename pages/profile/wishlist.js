import { Divider } from "antd";
import { Pagination } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Popover } from "antd";
import React from "react";
import UpperButton from "../../components/sidebar/Button";
import Layout from "../../../components/layout/Layout";
import SeoHead from "../../components/SeoHead";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishList from "../../components/WishList/WishList";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";
import axios from "axios";
import { db } from "../../utils/Firebase";

const Wishlist = () => {
  const [search, onSearch] = React.useState("");

  const [wish, setwish] = React.useState("");
  const [allUser, setallUser] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setcount] = React.useState();
  //for searching and maintaining the original data
  const [dupwishlist, setdupwishlist] = React.useState([]);
  const [wishlist, setwishlist] = React.useState([]);
  const [size, setsize] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  const [clickmenu, setmenu] = React.useState(false);
  const [modalshow, setmodal] = React.useState(false);
  const [pro_data, setdata] = React.useState({});
  const { user } = useSelector((state) => state.user);
  const OpenSideMenu = (e) => {
    e.preventDefault();
    setmenu(!clickmenu);
  };
  const handleCancel = () => {
    setmodal(false);
    setallUser([]);
  };
  const OnSearch = (e) => {
    e.preventDefault();
    setwishlist(
      dupwishlist.filter((s) =>
        s.shoeName.toLowerCase().includes(search.toLowerCase())
      )
    );
  };
  const title = () => {
    return (
      <span>
        <b>Seller profit = List Price - Fees - Purchase Price</b> <br /> Your
        fee is currently {5 - user.isListed / 10}%
      </span>
    );
  };
  const handleremove = async (e, id) => {
    e.preventDefault();
    await axios
      .get("https://sneaker-api-phi.vercel.app/deleteWish/" + id)
      .then((res) => {
        let removedData = wishlist.filter((item) => {
          return item._id !== id;
        });
        setwishlist(removedData);
        setdupwishlist(removedData);
        toast.success("Sneaker removed successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //get all user
  // React.useEffect(() => {
  //   db.collection("users")
  //     .get()
  //     .then((querySnapshot) => {
  //       let data = [];
  //       querySnapshot.forEach((doc) => {
  //         data.push({ name: doc.data().name, email: doc.data().email });
  //       });
  //       setallUser(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   return () => {
  //     setallUser([]);
  //   };
  // }, []);
  React.useEffect(() => {
    if (dupwishlist.length > 0) {
      if (page == 1) {
        setwishlist(dupwishlist.slice(0, 15));
      } else {
        setwishlist(dupwishlist.slice(15 * (page - 1), 15 * page));
      }
    }
  }, [page]);
  React.useEffect(() => {
    if (user && user.email) {
      const getWishList = async () => {
        await axios
          .get("https://sneaker-api-phi.vercel.app/getWishList/" + user.email)
          .then((res) => {
            setcount(res.data.length);
            if (page == 1) {
              setwishlist(res.data.slice(0, 15));
            }
            // } else {
            //   setwishlist(res.data.slice(15 * (page - 1), 15 * page));
            // }
            setdupwishlist(res.data);
            setloading(true);
          })
          .catch((err) => {
            console.log(err);
            setloading(true);
          });
      };
      getWishList();
    }
  }, [user]);
  const handleadd = async (e) => {
    e.preventDefault();
    var name = user.name + " " + user.lastname;
    if (size == "" || wish == "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (
      name === undefined ||
      user.state === undefined ||
      user.city === undefined ||
      user.country === undefined ||
      user.postalCode === undefined ||
      user.street === undefined ||
      user.phone === undefined ||
      user.phone.trim() == "" ||
      user.state.trim() == "" ||
      user.city.trim() == ""
    ) {
      toast.error("Please complete your profile");
      return;
    }

    if (user) {
      //https://sneaker-api-phi.vercel.app
      const data = {
        name: name,
        sku: wish,
        size: size,
        phone: user?.phone,
        email: user.email,
        purchase: 0,
        address:
          user?.country +
          " " +
          user?.state +
          " " +
          user?.city +
          " " +
          user?.street +
          " " +
          user?.postalCode,
      };
      //https://sneaker-api-phi.vercel.app
      await axios
        .post("https://sneaker-api-phi.vercel.app/addFormSneaker", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          // && res.data.discount_price > 0
          if (res.data && res.data.discount_price > 0) {
            await db
              .collection("users")
              .get()
              .then((querySnapshot) => {
                let data = [];
                querySnapshot.forEach((doc) => {
                  data.push({
                    name: doc.data().name,
                    email: doc.data().email,
                    list: doc.data().isListed,
                  });
                });
                setallUser(data);
              })
              .catch((err) => {
                console.log(err);
              });
            setmenu(false);
            setmodal(true);
            setdata(res.data);
          } else {
            toast.error("Please Enter Valid SKU");
            return;
          }
        })
        .catch((err) => {
          toast.error("Price is not available for now!");
          console.log(err);
        });
    } else {
      toast.error("Please Login");
    }
  };
  const handleOk = async () => {
    await axios
      .post("https://sneaker-api-phi.vercel.app/addWishListToDatabase", {
        data: pro_data,
        users: allUser,
      })
      .then((res) => {
        setwishlist([...wishlist, pro_data]);
        setdupwishlist([...dupwishlist, pro_data]);
        toast.success("Sneaker added to wishlist!");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
    setmodal(false);
  };
  return (
    <>
      <SeoHead title="WishList" />

      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap">
            <Sidebar open={open} />
            <div className="flex-1 overflow-x-hidden overflow-y-auto  bg-gray-200">
              <div className="container mx-auto">
                <div className="flex flex-col mt-8">
                  {clickmenu ? (
                    <WishList
                      handleadd={handleadd}
                      clickmenu={clickmenu}
                      setmenu={setmenu}
                      setwish={setwish}
                      setsize={setsize}
                      size={size}
                      wish={wish}
                    />
                  ) : (
                    ""
                  )}
                  <div className="py-2   sm:px-6  lg:px-8">
                    <div className=" w-full mx-auto align-middle  shadow sm:rounded-lg">
                      <header
                        style={{ alignItems: "center" }}
                        className="px-5 py-4 justify-center border-gray-100 flex flex-row sm:justify-between flex-wrap "
                      >
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
                              style={{
                                fontSize: "20px",
                                display: search.length <= 0 ? "none" : "",
                              }}
                              className="ri-close-fill absolute right-24 top-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                              onClick={(e) => {
                                e.preventDefault();
                                onSearch("");
                                setwishlist(dupwishlist);
                              }}
                            ></i>
                            <button
                              type="submit"
                              style={{
                                right: "0.2rem",
                                borderRadius: "2rem",
                                bottom: "5px",
                              }}
                              onClick={OnSearch}
                              className="text-white absolute  bottom-1.5 bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                        {dupwishlist.length > 0 && (
                          <div>
                            <button
                              onClick={OpenSideMenu}
                              type="button"
                              className="bttn cartsvg"
                            >
                              Add
                            </button>
                          </div>
                        )}
                        <Divider />
                      </header>

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
                      ) : dupwishlist.length <= 0 ? (
                        <div>
                          <center>
                            <p className="mb-2 font-light text-black-600 md:text-lg dark:text-black-600">
                              No added wish list
                            </p>
                            <button
                              className="text-white mb-2 rounded-lg cursor-pointer bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              onClick={OpenSideMenu}
                            >
                              + Add
                            </button>
                          </center>
                        </div>
                      ) : wishlist.length <= 0 ? (
                        <div>
                          <center>
                            <p className="mb-2 font-light text-black-600 md:text-lg dark:text-black-600">
                              No Search Found
                            </p>
                          </center>
                        </div>
                      ) : (
                        <div className="overflow-x-auto overflow-y-hidden p-3">
                          <table className="table-auto w-full">
                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                              <tr>
                                {/* <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    <Checkbox
                                      indeterminate={indeterminate}
                                      onChange={onCheckAllChange}
                                      checked={checkAll}
                                    ></Checkbox>
                                  </div>
                                </th> */}

                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Name
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    SKU
                                  </div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left flex flex-row gap-1 items-center">
                                    List Price
                                  </div>
                                </th>

                                {/* <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-left">
                                    Status
                                  </div>
                                </th> */}
                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-center">
                                    SIZE
                                  </div>
                                </th>

                                <th className="p-2 whitespace-nowrap">
                                  <div className="font-semibold text-center">
                                    Delete
                                  </div>
                                </th>
                              </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-gray-100">
                              {wishlist &&
                                wishlist.map((p, ind) => {
                                  return (
                                    <tr>
                                      {/* <Link href={`/Product/${p._id}`}> */}
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
                                      {/* </Link> */}
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-left">
                                          {p.styleID}
                                        </div>
                                      </td>
                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">
                                          ${Math.round(p.discount_price)}
                                        </div>
                                      </td>

                                      <td className="p-2 whitespace-nowrap">
                                        <div className="text-lg text-center">
                                          {p.size}
                                        </div>
                                      </td>

                                      <td className="p-2 whitespace-nowrap">
                                        <div
                                          onClick={(e) => {
                                            handleremove(e, p._id);
                                          }}
                                          className="text-lg text-center cursor-pointer"
                                        >
                                          <i
                                            style={{
                                              background: "red",
                                            }}
                                            className="ri-delete-bin-line custumbt"
                                          ></i>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                          <Pagination
                            current={page}
                            onChange={(page) => setPage(page)}
                            total={Math.floor((count / 15) * 10)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          //title="Basic Modal"
          width={1000}
          centered
          open={modalshow}
          onCancel={handleCancel}
          footer={[
            <Button
              key="submit"
              style={{ background: "#001968" }}
              type="primary"
              onClick={handleOk}
            >
              Add
            </Button>,
          ]}
        >
          <div
            className="cardmain pt-24"
            style={{
              margin: "auto",
              width: "100%",
              boxShadow: "0px 0px 0px 0px #000000",
            }}
          >
            <div className="bodyhead">
              <div className="card__body">
                <div className="half">
                  <div className="featured_text">
                    <h1
                      className="font-design font-normal text-gray-700 dark:text-gray-400"
                      style={{
                        fontSize: "25px",
                        lineHeight: "30px",
                        marginBottom: "0.2rem",
                      }}
                    >
                      {pro_data.shoeName}
                    </h1>
                    {/* <h1
                      className="sub font-design"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ${Math.round(pro_data.discount_price)}&nbsp;&nbsp;
                    </h1> */}
                    {/* <span>
                      {userPrice.display ? (
                        <input
                          id="default-checkbox"
                          type="text"
                          style={{
                            borderRadius: "15px",
                          }}
                          onChange={(e) =>
                            setuserPrice({
                              ...userPrice,
                              price: e.target.value,
                            })
                          }
                          name="price"
                          value={userPrice.price}
                          className="w-28 h-10  bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 "
                        />
                      ) : (
                        ""
                      )}
                    </span> */}
                  </div>
                  <div className="image">
                    <img
                      src={pro_data.thumbnail}
                      key={pro_data._id}
                      alt="image not found"
                      style={{ maxWidth: "100%" }}
                    />
                    {/* ))} */}
                    {/* </Carousel> */}
                  </div>
                </div>
                <div className="half">
                  <div className="description">
                    <p>{pro_data.description ?? ""}</p>
                  </div>

                  <div className="reviews">
                    <h3
                      style={{
                        fontWeight: "500",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",

                        color: "#181e28",
                      }}
                    >
                      Size: <span> {pro_data.size}</span>
                    </h3>
                    <h3
                      style={{
                        fontWeight: "500",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",

                        color: "#181e28",
                      }}
                    >
                      Gender:{" "}
                      <span style={{ textTransform: "capitalize" }}>
                        {" "}
                        {pro_data.gender}
                      </span>
                    </h3>
                    {/* <h3
                      style={{
                        fontWeight: "500",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",
                        display: "flex",
                        color: "#181e28",
                      }}
                    >
                      <Popover
                        content={title}
                        // title="Title"
                      >
                        <div className="flex flex-row gap-1 items-center">
                          {" "}
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
                      :{" "}
                      <div
                        style={{
                          color:
                            pro_data.discount_price * 0.94 <= pro_data?.purchase
                              ? "red"
                              : "green",
                        }}
                      >
                        {Math.round(
                          pro_data?.discount_price * 0.94 - pro_data?.purchase
                        ) > 0
                          ? "$" +
                            Math.round(
                              pro_data?.discount_price * 0.94 -
                                pro_data?.purchase
                            )
                          : "-$" +
                            Math.round(
                              Math.abs(
                                pro_data?.discount_price * 0.94 -
                                  pro_data?.purchase
                              )
                            )}
                      </div>
                    </h3> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Wishlist;
