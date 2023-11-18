import React, { useEffect } from "react";
import { Button, Modal } from "antd";
import Link from "next/link";
import Layout from "../../../components/layout/Layout";
import "remixicon/fonts/remixicon.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
import SeoHead from "../../../components/SeoHead";
export const getStaticPaths = async () => {
  const res = await axios.get(
    "https://sneaker-api-phi.vercel.app/getallsneaker"
  );
  const data = await res.data;
  const paths = data.map((sneak) => {
    return {
      params: {
        pid: sneak._id,
      },
    };
  });
  return {
    paths,

    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const path = context.params.pid;
  const res = await axios.get(
    `https://sneaker-api-phi.vercel.app/getsneaker/${path}`
  );
  const data = await res.data;

  return {
    props: {
      pdata: data,
    },
  };
};

const SellProduct = ({ pdata }) => {
  const initialstate = {
    name: "",
    email: "",
    sku: "",
    phone: "",
    size: "",
    purchase: "",
    address: "",
  };
  const handlehold = async () => {
    var data = {
      ...pro_data,
      show: true,
    };
    await axios
      .post("https://sneaker-api-phi.vercel.app/addSneakerToDatabase", {
        data: data,
      })
      .then((res) => {
        toast.success("Sneaker added for hold");
        setSneaker(initialstate);
      })
      .catch((err) => {
        console.log(err);
      });
    setmodal(false);
  };
  const handleOk = async () => {
    await axios
      .post("https://sneaker-api-phi.vercel.app/addSneakerToDatabase", {
        data: pro_data,
      })
      .then((res) => {
        toast.success("Sneaker added successfully");
        setSneaker(initialstate);
      })
      .catch((err) => {
        console.log(err);
      });
    setmodal(false);
  };

  const handleCancel = () => {
    setmodal(false);
  };
  const [sneaker, setSneaker] = React.useState(initialstate);
  const [modalshow, setmodal] = React.useState(false);
  const [pro_data, setdata] = React.useState({});
  const [checkbox, setcheckbox] = React.useState({
    chech_one: false,
    chech_two: false,
  });
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.email) {
      var struct_address =
        user?.country +
        "! " +
        user?.state +
        "! " +
        user?.city +
        "! " +
        user?.street +
        "! " +
        user?.postalCode;
      setSneaker({
        ...pdata[0],
        name: user.name + " " + user?.lastname,
        email: user.email,
        sku: pdata[0].styleID,
        size: pdata[0].size,
        purchase: Math.round(pdata[0].discount_price),
        phone: user?.phone,
        address: struct_address.replace(new RegExp("! ", "g"), ", "),
      });
    }
  }, [user]);
  const handlecheck = (e) => {
    e.preventDefault();
    setcheckbox({ ...checkbox, [e.target.value]: !checkbox[e.target.value] });
  };
  const handleadd = async (e) => {
    e.preventDefault();
    if (checkbox.chech_one == false || checkbox.chech_two == false) {
      toast.error("Please check the box");
      return;
    }
    if (user) {
      if (
        user.name === undefined ||
        user.state === undefined ||
        user.city === undefined ||
        user.country === undefined ||
        user.postalCode === undefined ||
        user.street === undefined ||
        user.phone === undefined
      ) {
        toast.error("Please complete your profile");
        return;
      }
      if (sneaker.size == "" || sneaker.sku == "" || sneaker.purchase == "") {
        toast.error("Please fill all the fields");
        return;
      }
      const data = {
        ...sneaker,
        purchase: parseInt(sneaker.discount_price),
      };
      //https://sneaker-api-phi.vercel.app

      await axios
        .post("https://sneaker-api-phi.vercel.app/addFormSneaker", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(async (res) => {
          if (res.data && res.data.shoeName && res.data.discount_price > 0) {
            setmodal(true);
            setdata(res.data);
          } else {
            toast.error("Please Enter Valid SKU");
            return;
          }
          // toast.success("Sneaker added successfully");
          // setSneaker(initialstate);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Please Login");
    }
  };
  const onChange = (e) => {
    setSneaker({ ...sneaker, [e.target.name]: e.target.value });
  };
  return (
    <>
      <SeoHead title="Sell Form" />
      <Layout>
        <div className="py-20 lg:py-24">
          <div className="cardui">
            <form onSubmit={handleadd}>
              {/* <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  style={{ borderRadius: "0px", color: "white" }}
                  name="name"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={sneaker.name}
                  onChange={onChange}
                  required
                />
                <label
                  for="floating_email"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div> */}
              <div className="relative z-0 w-full mb-6 group">
                <input
                  onChange={onChange}
                  type="text"
                  style={{ borderRadius: "0px", color: "white" }}
                  name="sku"
                  disabled
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={sneaker.sku}
                  required
                />
                <label
                  for="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  SKU
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="size"
                    id="floating_repeat_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={sneaker.size}
                  />
                  <label
                    for="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Size
                  </label>
                </div>

                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="purchase"
                    id="floating_repeat_password"
                    className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={Math.round(sneaker.purchase)}
                  />
                  <label
                    for="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Purchase Price
                  </label>
                </div>
              </div>
              {/* <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="tel"
                    style={{ borderRadius: "0px", color: "white" }}
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker.phone}
                    required
                  />
                  <label
                    for="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="address"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker.address}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Address
                  </label>
                </div>
              </div> */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    name="chech_one"
                    onChange={handlecheck}
                    value="chech_one"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    className="ml-2 text-sm font-medium text-white-500 dark:text-gray-300"
                  >
                    My sneakers are new and unworn with the original, undamaged
                    box.
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    onChange={handlecheck}
                    name="chech_two"
                    value="chech_two"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    for="default-checkbox"
                    className="ml-2 text-sm font-medium text-white-500 dark:text-gray-300"
                  >
                    I will ship the sneakers within 2 business days of the sales
                    to avoid penalties.
                  </label>
                </div>
              </div>
              <button
                type="submit"
                style={{
                  background: "white",
                  color: "#011b69",
                  margin: "10px auto",
                }}
                className="grid text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <ToastContainer />
        <Modal
          //title="Basic Modal"
          width={1000}
          centered
          open={modalshow}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handlehold}>
              Hold later
            </Button>,
            <Button
              key="submit"
              style={{ background: "#001968" }}
              type="primary"
              onClick={handleOk}
            >
              List now
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
                    <h1 className="sub font-design">
                      ${Math.round(pro_data.discount_price)}
                    </h1>
                    {/* <p className="price">₹{pro_data.prize}</p> */}
                  </div>
                  <div className="image">
                    {/* <Carousel
                      autoPlay
                      interval={2500}
                      infiniteLoop
                      showArrows={false}
                      showStatus={false}
                    > */}
                    {/* {pro_data.thumbnail &&
                        pro_data.thumbnail.map((i) => ( */}
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
                    <h3
                      style={{
                        fontWeight: "500",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: "20px",
                        display: "flex",
                        color: "#181e28",
                      }}
                    >
                      Profit:{" "}
                      <div
                        style={{
                          color:
                            pro_data.discount_price <= pro_data?.purchase
                              ? "red"
                              : "green",
                        }}
                        //className="text-lg text-center"
                      >
                        {Math.round(
                          pro_data?.discount_price - pro_data?.purchase
                        ) > 0
                          ? "$" +
                            Math.round(
                              pro_data?.discount_price - pro_data?.purchase
                            )
                          : "-$" +
                            Math.abs(
                              Math.round(
                                pro_data?.discount_price - pro_data?.purchase
                              )
                            )}
                      </div>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </Layout>
    </>
  );
};

export default SellProduct;
