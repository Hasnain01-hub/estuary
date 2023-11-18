import React from "react";
import { Popover } from "antd";
import { Button, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/layout/Layout";
import { useSelector } from "react-redux";
import axios from "axios";
import SeoHead from "../../components/SeoHead";
import { set } from "lodash";
const Addsneaker = () => {
  const initialstate = {
    name: "",
    sku: "",
    size: "",
    purchase: 0,
    address: "",
    phone: "",
    country: "",
    state: "",
    postalCode: "",
    city: "",
    street: "",
  };
  const { user } = useSelector((state) => state.user);
  const title = () => {
    return (
      <span>
        <b>Seller profit = List Price - Fees - Purchase Price</b> <br /> Your
        fee is currently {5 - user.isListed / 10}%
      </span>
    );
  };
  React.useEffect(() => {
    if (!user && !user?.email) {
      window.location.href = "/";
    } else {
      return;
    }
  }, [user]);
  React.useEffect(() => {
    if (user && user.email) {
      setSneaker({
        name: user.name + " " + user.lastname,
        size: user.size,
        phone: user.phone,
        country: user.country,
        state: user.state,
        postalCode: user.postalCode,
        city: user.city,
        street: user.street,
      });
    }
  }, [user]);
  const [sneaker, setSneaker] = React.useState(initialstate);
  const [checkbox, setcheckbox] = React.useState({
    chech_one: false,
    chech_two: false,
  });

  const [userPrice, setuserPrice] = React.useState({
    display: false,
    price: 0,
  });
  const [modalshow, setmodal] = React.useState(false);
  const [pro_data, setdata] = React.useState({});

  const handlehold = async () => {
    if (userPrice.price > 0 && userPrice.display) {
      pro_data.discount_price = userPrice.price;
    }
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
        setcheckbox({
          chech_one: false,
          chech_two: false,
        });
        setSneaker({
          ...sneaker,
          sku: "",
          size: "",
          purchase: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setmodal(false);
  };

  const handleOk = async () => {
    if (userPrice.price > 0 && userPrice.display) {
      pro_data.discount_price = userPrice.price;
    }
    await axios
      .post("https://sneaker-api-phi.vercel.app/addSneakerToDatabase", {
        data: pro_data,
      })
      .then((res) => {
        toast.success("Sneaker added successfully");
        setcheckbox({
          chech_one: false,
          chech_two: false,
        });
        setSneaker({
          ...sneaker,
          sku: "",
          size: "",
          purchase: "",
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setmodal(false);
  };
  const handlecheck = (e) => {
    e.preventDefault();
    setcheckbox({ ...checkbox, [e.target.name]: !checkbox[e.target.name] });
  };
  const handleCancel = () => {
    setmodal(false);
  };
  const handleadd = async (e) => {
    e.preventDefault();
    if (checkbox.chech_one == false || checkbox.chech_two == false) {
      toast.error("Please check the box");
      return;
    }
    if (sneaker.size == "" || sneaker.sku == "" || sneaker.purchase == "") {
      toast.error("Please fill all the fields");
      return;
    }
    if (
      sneaker.name === undefined ||
      sneaker.state === undefined ||
      sneaker.city === undefined ||
      sneaker.country === undefined ||
      sneaker.postalCode === undefined ||
      sneaker.street === undefined ||
      sneaker.phone === undefined ||
      sneaker.phone.trim() == "" ||
      sneaker.state.trim() == "" ||
      sneaker.city.trim() == ""
    ) {
      toast.error("Please complete your profile");
      return;
    }

    if (user) {
      //https://sneaker-api-phi.vercel.app
      const data = {
        name: sneaker.name,
        sku: sneaker?.sku,
        size: sneaker?.size,
        phone: sneaker?.phone,
        email: user.email,
        purchase: sneaker?.purchase,
        address:
          sneaker?.country +
          " " +
          sneaker?.state +
          " " +
          sneaker?.city +
          " " +
          sneaker?.street +
          " " +
          sneaker?.postalCode,
        // country: sneaker?.country,
        // state: sneaker?.state,
        // postalCode: sneaker?.postalCode,
        // city: sneaker?.city,
        // street: sneaker?.street,
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
        })
        .catch((err) => {
          toast.error("Please Enter Valid SKU");
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
      <SeoHead title="Add Sneaker" />
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
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div> */}
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="sku"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker.sku}
                    required
                  />
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    SKU
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="purchase"
                    id="floating_password"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker.purchase}
                    required
                  />
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Purchase Price
                  </label>
                </div>
              </div>
              {/* <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="country"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker?.country}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Country
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="state"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker?.state}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    State
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="city"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker?.city}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    City
                  </label>
                </div>
              </div> */}
              {/* <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="street"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker?.street}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Street
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="postalCode"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker?.postalCode}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Postal Code
                  </label>
                </div>
              </div> */}
              <div className="grid md:grid-cols-2 md:gap-6">
                {/* <div className="relative z-0 w-full mb-6 group">
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
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone
                  </label>
                </div> */}
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="size"
                    id="floating_repeat_password"
                    className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={sneaker.size}
                  />
                  <label
                    for="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-orange-100 peer-focus:dark:text-orange-100 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Size
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    id="default-checkbox"
                    type="checkbox"
                    name="chech_one"
                    onChange={handlecheck}
                    value={checkbox.chech_one}
                    checked={checkbox.chech_one}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
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
                    value={checkbox.chech_two}
                    checked={checkbox.chech_two}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded   dark:ring-offset-gray-800  dark:bg-gray-700 dark:border-gray-600"
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
                    <h1
                      className="sub font-design"
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      ${Math.round(pro_data.discount_price)}&nbsp;&nbsp;
                      <button
                        key="submit"
                        styles={{
                          background: "white",
                          color: "#011b69",
                          boxShadow: "none",
                        }}
                        // style={{ background: "#001968" }}
                        type="primary"
                        onClick={() =>
                          setuserPrice({
                            ...userPrice,
                            display: !userPrice.display,
                          })
                        }
                      >
                        {userPrice.display ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                          >
                            <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="20"
                          >
                            <path d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z"></path>
                          </svg>
                        )}
                      </button>
                    </h1>
                    <span>
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
                    </span>

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
                        //className="text-lg text-center"
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

export default Addsneaker;
