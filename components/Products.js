import "remixicon/fonts/remixicon.css";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import ScrollAnimationWrapper from "./Layout/ScrollAnimationWrapper";
import getScrollAnimation from "../utils/getScrollAnimation";
import Link from "next/link";
import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Pagination } from "antd";
import { Skeleton } from "antd";
import Head from "next/head";
import { Menu, Slider, Checkbox } from "antd";
import { useSelector } from "react-redux";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";

import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { flatMap } from "lodash";
//import { get } from "react-scroll/modules/mixins/scroller";
const { SubMenu } = Menu;

const Products = () => {
  const [senakers, setSenakers] = React.useState([]);
  const [statesenakers, setstateSenakers] = React.useState([]);
  const [data, setdata] = React.useState([]);
  const [price, setprice] = React.useState([100, 1000]);
  const [brand, setbrand] = React.useState([]);
  const [size, setsize] = React.useState([]);
  const [maxprice, setmaxprice] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [count, setcount] = React.useState();
  const [gender, setgender] = React.useState([]);
  const [check, setcheck] = React.useState([]);
  const [sizecheck, setsizecheck] = React.useState([]);
  const [gendercheck, setgendercheck] = React.useState([]);
  const [search, setsearch] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const { user } = useSelector((state) => state.user);
  const getdat = async () => {
    const res = await axios.get(
      "https://sneaker-api-phi.vercel.app/getallsneaker"
    );
    var data = await res.data;
    data = data.filter(
      (item) =>
        item.show == false && item.discount_price > 0 && item.sold == false
    );
    setdata(data);
    //setcount(data.length);
    setSenakers(data);
    //setstateSenakers(data.slice(0, 12));
    setmaxprice(Math.max(...data.map((c) => c.discount_price)));
    const val = [...new Set(data.map((c) => c.brand))];
    const size = [...new Set(data.map((c) => c.size))];
    const gen = [...new Set(data.map((c) => c.gender))];
    setgender(gen);
    setsize(size);
    setcheck(val.map((c) => false));
    setsizecheck(size.map((c) => false));
    setgendercheck(gen.map((c) => false));
    setbrand(val);
    setloading(true);
  };
  React.useEffect(() => {
    if (senakers.length > 0) {
      setcount(senakers.length);
      if (page == 1) {
        setstateSenakers(senakers.slice(0, 12));
      } else {
        setstateSenakers(senakers.slice(12 * (page - 1), 12 * page));
      }
    } else {
      setcount(0);
      setstateSenakers([]);
    }
    console.log("hsh");
  }, [loading, page, senakers]);

  React.useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });

    getdat();
    return () => {
      setSenakers([]);
      setdata([]);
      setbrand([]);
      setsize([]);
      setmaxprice(0);
      setgender([]);
      setcheck([]);
      setsizecheck([]);
      setgendercheck([]);
      setsearch("");
    };
  }, []);
  const showBrand = () =>
    brand.map((c, ind) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4 capitalize"
          value={c}
          name="brand"
          checked={check[ind]}
        >
          {c}
        </Checkbox>
        <br />
      </div>
    ));

  const showSize = () =>
    size
      .sort(function (a, b) {
        return a - b;
      })
      .map((c, ind) => (
        <div key={c._id}>
          <Checkbox
            onChange={handlesizeCheck}
            className="pb-2 pl-4 pr-4"
            value={c}
            name="size"
            checked={sizecheck[ind]}
          >
            {c}
          </Checkbox>
          <br />
        </div>
      ));

  const showGender = () =>
    gender.sort().map((c, ind) => (
      <div key={c}>
        <Checkbox
          onChange={handlegenderCheck}
          className="pb-2 pl-4 pr-4 capitalize"
          value={c}
          name="gender"
          checked={gendercheck[ind]}
        >
          {c == "child" ? "kids" : c}
        </Checkbox>
        <br />
      </div>
    ));
  const handlegenderCheck = (e) => {
    e.preventDefault();
    setprice([0, 0]);
    if (!e.target.checked) {
      var br = e.target.value;
      setSenakers((prev) => {
        if (data.length == senakers.length) {
          return data.filter((s) => !s.gender.includes(br));
        } else if (
          check.some((c) => c == true) ||
          // gendercheck.some((c) => c == true)
          sizecheck.some((c) => c == true)
        ) {
          var ans = [];
          sizecheck.map((c, ind) => {
            if (c == true) {
              ans.push(data.filter((s) => s.size == size[ind]));
            }
          });
          check.map((c, ind) => {
            if (c == true) {
              ans.push(data.filter((s) => s.brand == brand[ind]));
            }
          });
          return ans.flat();
          //return prev.filter((s) => !s.brand.includes(br));
        } else if (gendercheck.filter((c) => c == true).length > 1) {
          return prev.filter((s) => !s.gender.includes(e.target.value));
        } else {
          return prev.concat(
            data.filter((s) => !s.gender.includes(e.target.value))
          );
        }
      });
      const val = [...gendercheck];
      val[gender.indexOf(e.target.value)] = e.target.checked;
      setgendercheck(val);
    } else {
      var br = e.target.value;

      setSenakers((prev) => {
        if (data.length == senakers.length) {
          return data.filter((s) => s.gender.includes(br));
        } else if (
          check.some((c) => c == true) ||
          // gendercheck.some((c) => c == true)
          sizecheck.some((c) => c == true)
        ) {
          return prev.filter((s) => s.gender.includes(br));
        } else {
          return prev.concat(data.filter((s) => s.gender.includes(br)));
        }
      });

      const val = [...gendercheck];
      val[gender.indexOf(e.target.value)] = e.target.checked;
      setgendercheck(val);
    }
  };

  const handleCheck = (e) => {
    e.preventDefault();
    setprice([0, 0]);

    if (!e.target.checked) {
      var br = e.target.value;
      setSenakers((prev) => {
        if (data.length == senakers.length) {
          return data.filter((s) => !s.brand.includes(br));
        } else if (
          // check.some((c) => c == true) ||
          gendercheck.some((c) => c == true) ||
          sizecheck.some((c) => c == true)
        ) {
          var ans = [];
          gendercheck.map((c, ind) => {
            if (c == true) {
              ans.push(data.filter((s) => s.gender == gender[ind]));
            }
          });
          sizecheck.map((c, ind) => {
            if (c == true) {
              ans.push(data.filter((s) => s.size == size[ind]));
            }
          });
          return ans.flat();
          //return prev.filter((s) => !s.brand.includes(br));
        } else if (check.filter((c) => c == true).length > 1) {
          return prev.filter((s) => !s.brand.includes(e.target.value));
        } else {
          return prev.concat(
            data.filter((s) => !s.brand.includes(e.target.value))
          );
        }
      });
      const val = [...check];
      val[brand.indexOf(e.target.value)] = e.target.checked;
      setcheck(val);
    } else {
      var br = e.target.value;

      setSenakers((prev) => {
        if (data.length == senakers.length) {
          return data.filter((s) => s.brand.includes(br));
        } else if (
          // check.every((c) => c == true) ||
          gendercheck.some((c) => c == true) ||
          sizecheck.some((c) => c == true)
        ) {
          return prev.filter((s) => s.brand.includes(br));
        } else {
          return prev.concat(data.filter((s) => s.brand.includes(br)));
        }
      });

      const val = [...check];
      val[brand.indexOf(e.target.value)] = e.target.checked;
      setcheck(val);
    }
  };

  const handlesizeCheck = (e) => {
    e.preventDefault();
    setprice([0, 0]);
    if (!e.target.checked) {
      var br = e.target.value;
      setSenakers((prev) => {
        if (data.length == senakers.length) {
          return data.filter((s) => !s.size.includes(br));
        } else if (
          check.some((c) => c == true) ||
          gendercheck.some((c) => c == true)
          // sizecheck.some((c) => c == true)
        ) {
          var ans = [];
          gendercheck.map((c, ind) => {
            if (c == true) {
              ans.push(data.filter((s) => s.gender == gender[ind]));
            }
          });
          check.map((c, ind) => {
            if (c == true) {
              ans.push(data.filter((s) => s.brand == brand[ind]));
            }
          });
          return ans.flat();
          //return prev.filter((s) => !s.brand.includes(br));
        } else if (sizecheck.filter((c) => c == true).length > 1) {
          return prev.filter((s) => !s.size.includes(e.target.value));
        } else {
          return prev.concat(
            data.filter((s) => !s.size.includes(e.target.value))
          );
        }
      });
      const val = [...sizecheck];
      val[size.indexOf(e.target.value)] = e.target.checked;
      setsizecheck(val);
    } else {
      var br = e.target.value;

      setSenakers((prev) => {
        if (data.length == senakers.length) {
          return data.filter((s) => s.size.includes(br));
        } else if (
          check.some((c) => c == true) ||
          gendercheck.some((c) => c == true)
          // sizecheck.some((c) => c == true)
        ) {
          return prev.filter((s) => s.size.includes(br));
        } else {
          return prev.concat(data.filter((s) => s.size.includes(br)));
        }
      });

      const val = [...sizecheck];
      val[size.indexOf(e.target.value)] = e.target.checked;
      setsizecheck(val);
    }
  };
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);
  const handleSlider = (value) => {
    setprice(value);

    setSenakers(
      data.filter(
        (s) => s.discount_price >= value[0] && s.discount_price <= value[1]
      )
    );
  };
  const handleremove = async (e, id) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this sneaker?")) {
      await axios
        .get(`https://sneaker-api-phi.vercel.app/deletesneaker/${id}`)
        .then(async (res) => {
          toast.success("Sneaker Deleted");
          await getdat();
        });
    }
  };
  const onSearch = (e) => {
    e.preventDefault();

    setSenakers(
      data.filter(
        (s) =>
          s.shoeName.toLowerCase().includes(search.toLowerCase()) ||
          s.styleID.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <>
      <ScrollAnimationWrapper>
        <motion.div
          // variants={scrollAnimation}
          className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
        >
          <div className=" fullscreen  py-20 lg:py-24">
            <h3
              className="text-2xl sm:text-3xl text-center lg:text-4xl font-medium text-black-600 leading-relaxed w-full mx-auto"
              id="Machinery"
            >
              Shop
            </h3>
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
                  style={{
                    fontSize: "20px",
                  }}
                  className="ri-close-fill absolute right-24 top-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    setsearch("");
                    setSenakers(data);
                  }}
                ></i>

                <button
                  type="submit"
                  style={{ right: "0.2rem", borderRadius: "2rem" }}
                  onClick={onSearch}
                  className="text-white absolute right-2.5 bottom-1.5 bg-primarycolor text-background hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium  text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </div>
            {loading ? (
              <>
                <div className="menucard">
                  <div className="menus">
                    <Menu
                      style={{ background: "#fafafa" }}
                      defaultOpenKeys={["1", "2", "3", "4"]}
                      mode="inline"
                    >
                      <SubMenu
                        key="1"
                        title={<span className="h6">Gender</span>}
                      >
                        <div style={{ maringTop: "-10px" }}>{showGender()}</div>
                      </SubMenu>
                      {/* category */}
                      <SubMenu
                        key="2"
                        title={<span className="h6">Brands</span>}
                      >
                        <div style={{ maringTop: "-10px" }}>{showBrand()}</div>
                      </SubMenu>

                      <SubMenu key="3" title={<span className="h6">Size</span>}>
                        <div style={{ maringTop: "-10px" }}>{showSize()}</div>
                      </SubMenu>

                      <SubMenu
                        key="4"
                        title={<span className="h6">Price</span>}
                      >
                        <div>
                          <Slider
                            className="ml-4 mr-4"
                            tipFormatter={(v) => `$${v}`}
                            //tooltip={{ open: true }}
                            range={{ draggableTrack: true }}
                            value={price}
                            onChange={handleSlider}
                            min={100}
                            //defaultValue={[100, Math.round(maxprice) ?? 10000]}
                            max={Math.round(maxprice) ?? 10000}
                          />
                        </div>
                      </SubMenu>
                    </Menu>
                  </div>

                  <div
                    id="shop"
                    className="flex gap-6 flex-wrap flex-row smallscreen"
                  >
                    {statesenakers.length > 0 ? (
                      statesenakers &&
                      statesenakers
                        .filter(
                          (item, index, self) =>
                            self.findIndex(
                              (obj) => obj.styleID === item.styleID
                            ) === index
                        )
                        .map((item) => {
                          return (
                            <>
                              <Link href={`/product/${item._id}`}>
                                <div
                                  key={item._id}
                                  data-aos="fade-up"
                                  data-aos-offset="200"
                                  data-aos-delay="50"
                                  className="max-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 smallscreen-center"
                                  style={{
                                    boxShadow:
                                      "rgba(0, 0, 0, 0.2) 10px 14px 20px -10px",
                                    border: "1px solid rgba(0, 0, 0, 0.2)",
                                    height: "100%",
                                    boxSizing: "border-box",
                                  }}
                                >
                                  <img
                                    alt="Product"
                                    style={{
                                      //backgroundPosition: "center",
                                      // height: "230px",
                                      maxWidth: "100%",
                                      padding: "15px",
                                      borderRadius: "20px",
                                      objectFit: "cover",
                                      // transform: "translate(25px)",
                                    }}
                                    className="rounded-t-lg"
                                    src={item.thumbnail}
                                  />

                                  <div
                                    style={{
                                      // padding: "4px 10px",
                                      marginBottom: "12px",
                                    }}
                                    className="p-5"
                                  >
                                    <h5
                                      style={{
                                        height: "36px",
                                        overflow: "hidden",
                                      }}
                                      className="font-design font-normal text-gray-700 dark:text-gray-400"
                                    >
                                      {item.shoeName}
                                    </h5>
                                    <span
                                      style={{
                                        fontSize: "15px",
                                        fontWeight: "400",
                                      }}
                                    >
                                      {item.styleID}
                                    </span>
                                    <br />
                                    <span
                                      style={{
                                        fontSize: "26px",
                                        fontWeight: "500",
                                      }}
                                      className="
                              mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white
                              "
                                    >
                                      ${Math.round(item.discount_price)}
                                      {/* {item.description.substring(0, 50)}... */}
                                    </span>
                                    {user && user.role == "admin" ? (
                                      <i
                                        onClick={(e) => {
                                          handleremove(e, item._id);
                                        }}
                                        className="ri-delete-bin-line custumbt ml-1"
                                      ></i>
                                    ) : // <Button
                                    //   onClick={(e) => {
                                    //     handleremove(e, item._id);
                                    //   }}
                                    //   type="danger"
                                    //   className="custumbt"
                                    //   block
                                    //   shape="round"
                                    //   icon={<DeleteOutlined />}
                                    //   size="small"
                                    // ></Button>
                                    null}

                                    {user && user.role == "admin" ? (
                                      <Link href={`/edit/${item._id}`}>
                                        <i
                                          style={{ background: "#004490" }}
                                          className="ri-pencil-fill custumbt"
                                        ></i>
                                      </Link>
                                    ) : null}
                                  </div>
                                </div>
                              </Link>
                            </>
                          );
                        })
                    ) : (
                      <h2 class="font-semibold text-gray-800 text-center">
                        No products found
                      </h2>
                    )}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  <Pagination
                    current={page}
                    onChange={(page) => setPage(page)}
                    total={Math.floor((count / 12) * 10)}
                  />
                </div>
              </>
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

            <ToastContainer />
          </div>
        </motion.div>
      </ScrollAnimationWrapper>
    </>
  );
};

export default Products;
