import { Pagination } from "antd";
import React from "react";
import Layout from "../../components/layout/Layout";
import { Skeleton } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { sum, compact, set } from "lodash";
import { Button, Modal } from "antd";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import SeoHead from "../../components/SeoHead";
import Sidebar from "../../components/sidebar/Sidebar";
import UpperButton from "../../components/sidebar/Button";
const GetUserbuyed = () => {
  //buyed sneakers logic
  const [buyed, setbuyed] = React.useState([]);
  const [track, settrack] = React.useState("");
  const [soldtrack, setsoldtrack] = React.useState("");
  const [ship, setship_label] = React.useState([]);
  const [buyedtotal, setbuyedtotal] = React.useState(0);
  const [load, setload] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [shipfrom, setshipfrom] = React.useState({
    state: "",
    postalCode: "",
    city: "",
    street: "",
  });
  //3700 O Street, NW, Washington, D.C., 20057
  const { user } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [SoldIsModalOpen, setSoldIsModalOpen] = React.useState(false);
  const handleChange = (e) => {
    setshipfrom({
      ...shipfrom,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setload(true);
    if (
      shipfrom.country != "" &&
      shipfrom.state != "" &&
      shipfrom.postalCode != "" &&
      shipfrom.city != "" &&
      shipfrom.street != ""
    ) {
      var future = new Date();
      future.setDate(future.getDate() + 3);
      await axios
        .post(
          "https://api.goshippo.com/transactions/",
          {
            shipment: {
              address_from: {
                name: "The Estuary Group LLC",
                street1: shipfrom.street,
                city: shipfrom.city,
                state: shipfrom.state,
                zip: shipfrom.postalCode,
                country: "US",
                phone: soldtrack.sellerphone,
                email: user.email,
              },
              address_to: {
                name: soldtrack.name + " " + soldtrack.lastName ?? "",
                //company: "Estuary",
                street1: soldtrack?.shipping_details?.line1,
                // street2: soldtrack?.address?.line2,
                //street3: null,
                city: soldtrack?.shipping_details?.city,
                state: soldtrack?.shipping_details?.state,
                zip: soldtrack?.shipping_details?.postal_code,
                country: "US",
                phone: soldtrack?.phone,
                email: soldtrack?.email,
                // residential: true,
              },
              shipment_date: future.toISOString(),
              //shipDate: future.toISOString().split("T")[0],

              parcels: [
                {
                  length: "16",
                  width: "10",
                  height: "6",
                  distance_unit: "in",
                  weight: "5",
                  mass_unit: "lb",
                },
              ],
            },
            carrier_account: "8b58b216af6c4c3da123df64d55e96c7",
            servicelevel_token: "usps_priority",
            // async: false,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "ShippoToken shippo_live_a35380e1e83051bc48f17fe3ef94bb686d4de987",
            },
          }
        )
        .then(async (res) => {
          if (res?.data.status == "SUCCESS") {
            const data = {
              no: soldtrack.no,
              data: res?.data,
              buyer_email: soldtrack.email,
              seller_email: user.email,
            };
            ship[soldtrack.no] = data;
            await axios
              .post(
                `https://sneaker-api-phi.vercel.app/createshippinglabel`,
                { ship_data: ship, id: soldtrack.id },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              )
              .catch((err) => {
                console.log(err);
              });
            setshipfrom({
              country: "",
              state: "",
              postalCode: "",
              city: "",
              street: "",
            });
            setload(false);
            setSoldIsModalOpen(false);
            toast.success("Shipping label created successfully");
            window.location.href = "/form/addcheckcheck";
          } else {
            toast.error("Invalid address");
            setload(false);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.detail);
        });

      //window.location.href = "/form/addcheckcheck";
    } else {
      setload(false);
      toast.error("Please fill all fields");
    }
  };
  const showsoldModal = async (e, p) => {
    e.preventDefault();
    // setshipfrom({
    //   ...shipfrom,
    //   street: p?.shipFrom,
    // });

    if (p?.shipping_label[[p.no]]) {
      await axios
        .post(`/api/shippo_track`, {
          carrier: "usps",
          tracking_number: p?.shipping_label[[p.no]].data.tracking_number,
        })
        .then(async (res) => {
          const track_data = res.data.response;
          setship_label(p?.shipping_label);
          setsoldtrack({
            spent: p.spent,
            email: p.email,
            id: p._id,
            no: p.no,
            cancelobj: p.cancel,
            cancel: p.cancel[p.no],
            shipping_label: p?.shipping_label[[p.no]]
              ? [p?.shipping_label[[p.no]]]
              : [],
            sellerphone: p.sellerphone,
            phone: p.phone,
            name: p.name,
            lastName: p.lastName,
            shipping_details: p?.shipping_details,
            shipFrom: p?.shipFrom,
            brand: p.shoeName,
            address: p?.address,
            buyer: p.buyer,
            status: track_data?.tracking_status?.status,
            substatus: track_data?.tracking_status?.substatus,
            tracking_status: track_data?.tracking_status,
            tracking_history: track_data?.tracking_history,
          });
          setSoldIsModalOpen(true);
        });
    } else {
      setship_label(p?.shipping_label);
      setsoldtrack({
        spent: p.spent,
        email: p.email,
        id: p._id,
        no: p.no,
        cancelobj: p.cancel,
        cancel: p.cancel[p.no],
        shipping_label: p?.shipping_label[[p.no]]
          ? [p?.shipping_label[[p.no]]]
          : [],
        sellerphone: p.sellerphone,
        phone: p.phone,
        lastName: p.lastName,
        name: p.name,
        shipping_details: p?.shipping_details,
        shipFrom: p?.shipFrom,
        brand: p.shoeName,
        address: p?.address,
        buyer: p.buyer,
      });
      setSoldIsModalOpen(true);
    }
  };

  const handlesoldOk = () => {
    setSoldIsModalOpen(false);
  };

  const handlesoldCancel = () => {
    setSoldIsModalOpen(false);
  };

  const showModal = async (e, p) => {
    e.preventDefault();
    if (p?.shipping_label[[p.no]]) {
      await axios
        .post(`/api/shippo_track`, {
          carrier: "usps",
          tracking_number: p?.shipping_label[[p.no]].data.tracking_number,
        })
        .then(async (res) => {
          const track_data = res.data.response;
          settrack({
            track: p.prod_status[p.no].status,
            spent: p.spent,
            cancel: p.cancel[p.no],
            shipping_label: p?.shipping_label[[p.no]]
              ? [p?.shipping_label[[p.no]]]
              : [],
            name: p.name,
            brand: p.shoeName,
            tracking_status: track_data?.tracking_status,
          });
          setIsModalOpen(true);
        });
    } else {
      settrack({
        track: p.prod_status[p.no].status,
        spent: p.spent,
        cancel: p.cancel[p.no],
        shipping_label: p?.shipping_label[[p.no]]
          ? [p?.shipping_label[[p.no]]]
          : [],
        name: p.name,
        brand: p.shoeName,
      });
      setIsModalOpen(true);
    }
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleorderCancel = async (e, id, cancel_obj, no) => {
    e.preventDefault();
    if (window.confirm("Are you sure you want to cancel this order?")) {
      //cancelorder
      var cancel = cancel_obj;
      cancel[no] = true;
      //https://sneaker-api-phi.vercel.app
      await axios.post(
        `https://sneaker-api-phi.vercel.app/cancelorder/${id}`,
        {
          _id: id,
          cancel: cancel,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      toast.success("Order canceled successfully");
      window.location.reload();
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [buyedpage, setbuyedPage] = React.useState(1);

  const [buyedcount, setbuyedcount] = React.useState();
  const [buyedloading, setbuyedloading] = React.useState(false);

  const getbuyeddat = async (user) => {
    if (user && user.email) {
      const res = await axios.get(
        `https://sneaker-api-phi.vercel.app/getbuysneaker`
      );
      const data = await res.data;
      var arr = [];
      const metadata = data.map((item) => {
        // var price = 0;
        const res = item.product.map((pro, idnx) => {
          if (item.user.email == user.email) {
            // price = price + pro.discount_price;
            return {
              _id: item._id,
              no: idnx,
              prod_status: item?.prod_status,
              name: pro.name,
              cancel: item?.cancel,
              shipping_label: item?.shipping_label,
              phone: pro.phone,
              email: pro.email,
              spent: pro.discount_price,
              size: pro.size,
              thumbnail: pro.thumbnail,
              shoeName: pro.shoeName,
              date: item?.timestamp,
            };
          }
        });

        arr = arr.concat(res);
        arr = compact(arr);
        return arr;
      });
      var final_result = metadata[metadata.length - 1];

      setbuyedcount(final_result?.length);
      if (final_result?.length > 0) {
        setbuyedtotal(sum(final_result.map((i) => i.spent)));
      }

      if (buyedpage == 1) {
        setbuyed(final_result?.slice(0, 6));
      } else {
        setbuyed(final_result?.slice(6 * (buyedpage - 1), 6 * buyedpage));
      }
      setbuyedloading(true);
    }
  };
  React.useEffect(() => {
    getbuyeddat(user);
    setshipfrom({
      country: user?.country,
      state: user?.state,
      postalCode: user?.postalCode,
      city: user?.city,
      street: user?.street,
    });
  }, [user, buyedpage]);

  //end
  const [senakers, setSenakers] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [total, setotal] = React.useState(0);
  const [toggle, settoggle] = React.useState(false);
  const [count, setcount] = React.useState();
  const [loading, setloading] = React.useState(false);

  const getdat = async (user) => {
    if (user && user.email) {
      const res = await axios.get(
        `https://sneaker-api-phi.vercel.app/getbuysneaker`
      );
      const data = await res.data;
      var arr = [];
      const metadata = data.map((item) => {
        // var price = 0;
        const res = item.product.map((pro, idnx) => {
          if (pro.email == user.email) {
            // price = price + pro.discount_price;
            return {
              _id: item._id,
              no: idnx,
              prod_status: item?.prod_status,
              name: item.user.name,
              lastName: item.user.lastname,
              phone: item.user.phone,
              buyer: item.user,
              sellerphone: pro?.phone,
              email: item.user.email,
              size: pro.size,
              cancel: item?.cancel,
              spent: pro.discount_price,
              status: item?.status,
              thumbnail: pro.thumbnail,
              shoeName: pro.shoeName,
              shipping_label: item?.shipping_label,
              address: item?.address,
              shipping_details: item?.shipping_details,
              shipFrom: pro.address,
              date: item.updatedAt,
            };
          }
        });

        arr = arr.concat(res);
        arr = compact(arr);
        return arr;
      });
      var final_result = metadata[metadata.length - 1];

      setcount(final_result?.length);
      if (final_result?.length > 0) {
        setotal(sum(final_result.map((i) => i.spent)));
      }

      // setSenakers();
      if (page == 1) {
        setSenakers(final_result?.slice(0, 8));
      } else {
        setSenakers(final_result?.slice(8 * (page - 1), 8 * page));
      }
      setloading(true);
    }
  };
  React.useEffect(() => {
    getdat(user);
  }, [user, page]);
  const handleselect = async (e, item) => {
    e.preventDefault();

    setSenakers(
      senakers.map((i) => {
        if (i._id == item._id) {
          i.prod_status[item.no].status = e.target.value;
        }
        return i;
      })
    );
    item.prod_status[item.no].status = e.target.value;
    console.log(item.prod_status[item.no].status);

    await axios
      .post(
        `https://sneaker-api-phi.vercel.app/updatestatus`,
        {
          _id: item._id,
          no: item.no,
          prod_status: item.prod_status,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <SeoHead title="Order Page" />
      <Layout>
        <div className="w-full py-20 lg:py-24">
          <UpperButton setOpen={setOpen} open={open} />
          <div className="flex flex-nowrap">
            <Sidebar open={open} />
            <div className="flex-1  bg-gray-200">
              <div className="container mx-auto">
                <div className="flex flex-row-reverse justify-center sm:justify-between flex-wrap">
                  <div className="inline-flex items-center float-right">
                    <p4 className="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Sold
                    </p4>
                    <label className="relative inline-flex items-center cursor-pointer ">
                      <input
                        onClick={(e) => {
                          //e.preventDefault();
                          settoggle((prev) => !prev);
                        }}
                        type="checkbox"
                        value={toggle}
                        //checked={toggle}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-scolor peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-scolor after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-gray-500"></div>
                      <span className="ml-3 mr-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Purchased
                      </span>
                    </label>
                  </div>
                  {!toggle ? (
                    <header className="px-5 py-4  ">
                      {/* <h2 className="font-semibold text-gray-800">Sneakers Buyed</h2> */}
                      <h2 className="font-semibold text-gray-800">
                        Total Revenue: ${Math.round(total)}
                      </h2>
                    </header>
                  ) : (
                    <header className="px-5 py-4  ">
                      <h2 className="font-semibold text-gray-800">
                        Total spent: ${Math.round(buyedtotal)}
                      </h2>
                    </header>
                  )}
                </div>
                {!toggle ? (
                  <div className="w-full mx-auto bg-white ">
                    {loading ? (
                      <div className="containerwidth mx-auto px-4">
                        <div className="flex  flex-wrap md:flex-row gap-5  displaycenter">
                          {senakers?.length > 0 ? (
                            senakers &&
                            senakers.map((p, ind) => {
                              return (
                                <>
                                  <div
                                    style={{
                                      width: "315px",
                                    }}
                                    className="bg-white shadow-lg rounded-lg"
                                  >
                                    <div
                                      className=" bg-cover"
                                      style={{
                                        width: "140px",
                                        height: "100px",
                                        margin: "0px auto",
                                        backgroundImage: `url(${p.thumbnail})`,
                                      }}
                                    ></div>
                                    <div className=" p-4">
                                      <h1 className="text-gray-900 font-bold text-2xl">
                                        {p.shoeName}
                                      </h1>
                                      {/* <p className="mt-2 text-gray-600 text-sm">
                                  {new Date(p.date).toDateString()}
                                </p> */}
                                      <div className="flex flex-row justify-between">
                                        <h1 className="text-gray-700 pt-1 font-bold text-xl">
                                          ${Math.round(p.spent)}
                                        </h1>
                                        <h1 className="text-gray-700 pt-1 font-semibold text-xl">
                                          Size: {p.size}
                                        </h1>
                                      </div>
                                      {/* {
                                  <div className="action">
                                    {p.cancel[p.no] ? (
                                      <button
                                        className="mt-1"
                                        // onClick={(e) => handleorderCancel(e, p)}
                                        disabled
                                        type="button"
                                        style={{
                                          background: "#fff",
                                          color: "#AA0000",
                                          fontWeight: "bold",
                                          borderRadius: "10px",
                                          padding: "5px 10px",
                                        }}
                                      >
                                        Canceled
                                      </button>
                                    ) : (
                                      <button
                                        className="mt-1"
                                        onClick={(e) => handleorderCancel(e, p)}
                                        type="button"
                                        style={{
                                          background: "#fff",
                                          color: "#AA0000",
                                          borderRadius: "10px",
                                          fontWeight: "bold",
                                          padding: "5px 10px",
                                        }}
                                      >
                                        Cancel Order
                                      </button>
                                    )}
                                  </div>
                                } */}
                                      <div className="flex item-center justify-between mt-3">
                                        <div class="text-lg text-center">
                                          <select
                                            onChange={(e) => handleselect(e, p)}
                                            value={p.prod_status[p.no]?.status}
                                          >
                                            <option
                                              value={
                                                p.prod_status[p.no]?.status
                                              }
                                            >
                                              {p.prod_status[p.no]?.status}
                                            </option>
                                            {p.prod_status[p.no]?.status !=
                                            "Confirm Order" ? (
                                              <option value="Confirm Order">
                                                Confirm Order
                                              </option>
                                            ) : null}
                                            {p.prod_status[p.no]?.status !=
                                            "Shipped" ? (
                                              <option value="Shipped">
                                                Shipped
                                              </option>
                                            ) : null}
                                            {/* {p.prod_status[p.no]?.status !=
                                      "Out for delivery" ? (
                                        <option value="Out for delivery">
                                          Out for delivery
                                        </option>
                                      ) : null}
                                      {p.prod_status[p.no]?.status !=
                                      "Delivered" ? (
                                        <option value="Delivered">
                                          Delivered
                                        </option>
                                      ) : null} */}
                                          </select>
                                        </div>
                                        <div>
                                          <button
                                            onClick={(e) => showsoldModal(e, p)}
                                            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
                                          >
                                            view details
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              );
                            })
                          ) : (
                            <h2 className=" capitalize font-semibold text-gray-800 text-center">
                              No Products Found
                              {/* No Sneakers Buyed */}
                            </h2>
                          )}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                          }}
                        >
                          <Pagination
                            current={page}
                            onChange={(page) => setPage(page)}
                            total={Math.floor((count / 8) * 10)}
                          />
                        </div>
                        <Modal
                          //title="Basic Modal"
                          width={1000}
                          centered
                          open={SoldIsModalOpen}
                          onCancel={handlesoldCancel}
                          footer={[
                            <div className="action">
                              {soldtrack.cancel ? (
                                <button
                                  className="mt-1"
                                  // onClick={(e) => handleorderCancel(e, p)}
                                  disabled
                                  type="button"
                                  style={{
                                    background: "#fff",
                                    color: "#AA0000",
                                    cursor: "not-allowed",
                                    fontWeight: "bold",
                                    borderRadius: "10px",
                                    padding: "5px 10px",
                                  }}
                                >
                                  Canceled
                                </button>
                              ) : (
                                <button
                                  className="mt-1"
                                  onClick={(e) =>
                                    handleorderCancel(
                                      e,
                                      soldtrack.id,
                                      soldtrack.cancelobj,
                                      soldtrack.no
                                    )
                                  }
                                  type="button"
                                  style={{
                                    background: "#fff",
                                    color: "#AA0000",
                                    borderRadius: "10px",
                                    fontWeight: "bold",
                                    padding: "5px 10px",
                                  }}
                                >
                                  Cancel Order
                                </button>
                              )}
                            </div>,
                            // <Button
                            //   key="submit"
                            //   style={{ background: "#c81e1d" }}
                            //   type="primary"
                            //   onClick={handlesoldOk}
                            // >
                            //   Close
                            // </Button>,
                          ]}
                        >
                          <section className="dark:bg-gray-800 dark:text-gray-100">
                            <div className="container max-w-5xl px-4 py-12 mx-auto">
                              <h3 className="font-bold">Buyer Details:</h3>
                              <div>
                                <p>
                                  <span className="font-bold">Name:</span>{" "}
                                  {soldtrack.name}
                                </p>
                                <p>
                                  <span className="font-bold">Email:</span>{" "}
                                  {soldtrack.email}
                                </p>
                                <p>
                                  <span className="font-bold">Street:</span>{" "}
                                  {soldtrack?.shipping_details?.line1}
                                </p>
                                <p>
                                  <span className="font-bold">City:</span>{" "}
                                  {soldtrack?.shipping_details?.city}
                                </p>
                                <p>
                                  <span className="font-bold">Zip Code:</span>{" "}
                                  {soldtrack?.shipping_details?.postal_code}
                                </p>
                                <p>
                                  <span className="font-bold">State:</span>{" "}
                                  {soldtrack?.shipping_details?.state}
                                </p>
                              </div>
                              {!soldtrack.cancel ? (
                                soldtrack.shipping_label &&
                                !soldtrack.shipping_label.length ? (
                                  <div>
                                    <form className="mt-4">
                                      <h3 className="font-bold">
                                        Seller details:
                                      </h3>
                                      <div className="flex flex-col sm:flex-row justify-between">
                                        <div
                                          style={{ width: "90%" }}
                                          className="flex flex-col"
                                        >
                                          <div className="grid md:grid-cols-2 md:gap-6">
                                            {/* <div className="relative py-5 mt-2">
                                      <label
                                        className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                                        htmlFor="name-input"
                                      >
                                        Country
                                      </label>
                                      <input
                                        style={{ background: "#004490" }}
                                        className="pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                                        id="name-input"
                                        type="text"
                                        name="country"
                                        value={shipfrom.country}
                                        onChange={(e) => handleChange(e)}
                                        placeholder="E.g. USA"
                                      />
                                    </div> */}
                                            <div className="relative py-5 mt-2">
                                              <label
                                                className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                                                htmlFor="email-input"
                                              >
                                                Street
                                              </label>
                                              <input
                                                style={{
                                                  background: "#004490",
                                                }}
                                                className=" pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                                                id="name-input"
                                                type="text"
                                                name="street"
                                                value={shipfrom.street}
                                                onChange={(e) =>
                                                  handleChange(e)
                                                }
                                                placeholder="E.g. 1234 Main St"
                                              />
                                            </div>

                                            <div className="relative py-5 mt-2">
                                              <label
                                                className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                                                htmlFor="email-input"
                                              >
                                                City
                                              </label>
                                              <input
                                                style={{
                                                  background: "#004490",
                                                }}
                                                className=" pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                                                id="name-input"
                                                type="text"
                                                name="city"
                                                value={shipfrom.city}
                                                onChange={(e) =>
                                                  handleChange(e)
                                                }
                                                placeholder="E.g. Manhattan"
                                              />
                                            </div>
                                          </div>
                                          <div className="grid md:grid-cols-2 md:gap-6">
                                            <div className="relative py-5 mt-2">
                                              <label
                                                className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                                                htmlFor="email-input"
                                              >
                                                State
                                              </label>
                                              <input
                                                style={{
                                                  background: "#004490",
                                                }}
                                                className=" pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                                                id="name-input"
                                                type="text"
                                                name="state"
                                                value={shipfrom.state}
                                                onChange={(e) =>
                                                  handleChange(e)
                                                }
                                                placeholder="E.g. New York"
                                              />
                                            </div>
                                            <div className="relative py-5 mt-2">
                                              <label
                                                className="absolute top-0 left-0 tracking-wide font-semibold text-sm"
                                                htmlFor="email-input"
                                              >
                                                Postal Code
                                              </label>
                                              <input
                                                style={{
                                                  background: "#004490",
                                                }}
                                                className=" pl-2 w-full bg-transparent text-gray-100 text-base font-medium tracking-wide border-b-2 py-2 hocus:border-pink-400 focus:outline-none transition duration-200"
                                                id="name-input"
                                                type="text"
                                                name="postalCode"
                                                value={shipfrom.postalCode}
                                                onChange={(e) =>
                                                  handleChange(e)
                                                }
                                                placeholder="E.g. 10001"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <button
                                        style={{
                                          width: "13rem",
                                          border: "1px solid #004490",
                                          margin: "0px auto",
                                          display: "block",
                                          color: "#004490",
                                        }}
                                        className="w-full sm:w-32 mt-2 py-3 bg-gray-100 text-primarycolor rounded-full font-bold tracking-wide shadow-lg uppercase text-sm transition duration-300 transform focus:outline-none focus:shadow-outline hover:bg-gray-300 hover:text-primary-700 hocus:-translate-y-px hocus:shadow-xl"
                                        type="button"
                                        onClick={(e) => handleSubmit(e)}
                                        value="Submit"
                                      >
                                        {!load
                                          ? "Create Shipping Label"
                                          : "Creating..."}
                                      </button>
                                    </form>
                                  </div>
                                ) : (
                                  <div className="mt-4">
                                    <h3 className="font-bold">
                                      Shipping details:
                                    </h3>
                                    <p>
                                      <span className=" capitalize font-bold">
                                        tracking number:
                                      </span>{" "}
                                      {soldtrack.shipping_label &&
                                        soldtrack.shipping_label.length &&
                                        soldtrack?.shipping_label[0].data
                                          .tracking_number}
                                    </p>
                                    <p>
                                      <span className=" capitalize font-bold">
                                        Ship status:
                                      </span>{" "}
                                    </p>

                                    <ul style={{ marginLeft: "2%" }}>
                                      <li>
                                        Status:{" "}
                                        {soldtrack?.tracking_status &&
                                          soldtrack?.tracking_status.status}
                                      </li>
                                      <li>
                                        Substatus:{" "}
                                        {soldtrack?.tracking_status &&
                                          soldtrack.tracking_status.substatus
                                            .text}
                                      </li>
                                      <li>
                                        Status Date:{" "}
                                        {soldtrack?.tracking_status &&
                                          new Date(
                                            soldtrack.tracking_status.status_date
                                          ).toDateString()}
                                      </li>
                                      <li>
                                        Location:{" "}
                                        {(soldtrack?.tracking_status &&
                                          soldtrack.tracking_status.location
                                            .city) ||
                                          ""}
                                        ,{" "}
                                        {(soldtrack?.tracking_status &&
                                          soldtrack.tracking_status.location
                                            .state) ||
                                          ""}
                                        ,{" "}
                                        {(soldtrack?.tracking_status &&
                                          "zip: " +
                                            soldtrack.tracking_status.location
                                              .zip) ||
                                          ""}
                                        ,{" "}
                                        {(soldtrack?.tracking_status &&
                                          soldtrack.tracking_status.location
                                            .country) ||
                                          ""}
                                      </li>
                                      {/* </a> */}
                                    </ul>
                                    <p>
                                      <span className=" capitalize font-bold">
                                        label url:
                                      </span>{" "}
                                      <a
                                        href={
                                          soldtrack.shipping_label &&
                                          soldtrack.shipping_label.length &&
                                          soldtrack?.shipping_label[0].data
                                            .label_url
                                        }
                                        target="_blank"
                                        className=" capitalize font-bold underline"
                                      >
                                        label
                                      </a>
                                    </p>
                                    <Link
                                      href="/form/addcheckcheck"
                                      className="mt-5 cursor-pointer inline-flex items-center text-white-500 bg-maincolor hover:bg-scolor focus:ring-4 focus:ring-scolor font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900"
                                    >
                                      <span className="mr-2">Verify shoes</span>
                                    </Link>
                                  </div>
                                )
                              ) : (
                                <p className="mt-4 text-black-600 text-xl sm:text-xl lg:text-xl leading-relaxed font-medium smpadding">
                                  You have canceled this order!
                                </p>
                              )}
                            </div>
                          </section>
                        </Modal>
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
                ) : (
                  <>
                    <div>
                      <div className="containerwidth mx-auto px-4">
                        <div>
                          {buyedloading ? (
                            buyed?.length > 0 ? (
                              <>
                                <div className="flex  flex-wrap md:flex-row gap-5  displaycenter">
                                  {buyed &&
                                    buyed.map((p, ind) => {
                                      return (
                                        <div
                                          style={{
                                            width: "315px",
                                          }}
                                          className="bg-white shadow-lg rounded-lg"
                                        >
                                          <div
                                            className=" bg-cover"
                                            style={{
                                              width: "140px",
                                              height: "100px",
                                              margin: "0px auto",
                                              backgroundImage: `url(${p.thumbnail})`,
                                            }}
                                          ></div>
                                          <div className=" p-4">
                                            <h1 className="text-gray-900 font-bold text-2xl">
                                              {p.shoeName}
                                            </h1>
                                            <p className="mt-2 text-gray-600 text-sm">
                                              {new Date(p.date).toDateString()}
                                            </p>
                                            <h1 className="text-gray-700  font-semibold text-xl">
                                              Size: {p.size}
                                            </h1>
                                            <div className="flex item-center justify-between mt-3">
                                              <h1 className="text-gray-700 font-bold text-xl">
                                                ${Math.round(p.spent)}
                                              </h1>

                                              <div>
                                                <button
                                                  onClick={(e) =>
                                                    showModal(e, p)
                                                  }
                                                  className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
                                                >
                                                  Track Order
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginTop: "20px",
                                  }}
                                >
                                  <Pagination
                                    current={buyedpage}
                                    onChange={(buyedpage) =>
                                      setbuyedPage(buyedpage)
                                    }
                                    total={Math.floor((buyedcount / 6) * 10)}
                                  />
                                </div>
                              </>
                            ) : (
                              <h2 className="font-semibold text-gray-800 text-center capitalize">
                                No Products Found
                              </h2>
                            )
                          ) : (
                            <div className="px-20 lg:px-24">
                              <div
                                id="shop"
                                className="displaygrid justify-center"
                                style={{
                                  gridTemplateColumns: "repeat(1, 1fr)",
                                }}
                              >
                                <Skeleton active />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <Modal
                      //title="Basic Modal"
                      width={1000}
                      centered
                      open={isModalOpen}
                      onCancel={handleCancel}
                      footer={
                        [
                          // <Button key="back" onClick={handleCancel}>
                          //   Cancel
                          // </Button>,
                          // <Button
                          //   key="submit"
                          //   style={{ background: "#c81e1d" }}
                          //   type="primary"
                          //   onClick={handleOk}
                          // >
                          //   Close
                          // </Button>,
                        ]
                      }
                    >
                      <section className="dark:bg-gray-800 dark:text-gray-100">
                        <div className="container max-w-5xl px-4 py-12 mx-auto">
                          <div className="grid gap-4  sm:grid-cols-12">
                            <div className="col-span-12 sm:col-span-3">
                              <div className="text-center sm:text-left mb-14 before:block sm:before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto before:mx-0 before:bg-primarycolor">
                                <h3 className="text-3xl font-semibold">
                                  {track.brand}
                                </h3>
                                <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">
                                  By&nbsp;{track?.name}
                                </span>
                              </div>
                            </div>
                            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                              {!track?.cancel ? (
                                <div className="col-span-12 space-y-12 relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:bg-primarycolor">
                                  <div
                                    className={`flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] ${
                                      track.track == "Shipped"
                                        ? "before:bg-green-500"
                                        : "before:bg-primarycolor"
                                    }`}
                                  >
                                    <h3 className="text-xl font-semibold tracking-wide">
                                      Shipped
                                    </h3>
                                    {track.track == "Shipped" && (
                                      <div>
                                        <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                                          Tracking number:{" "}
                                          {track.shipping_label &&
                                            track.shipping_label.length &&
                                            track?.shipping_label[0].data
                                              .tracking_number}
                                        </time>
                                        <p className="mt-3">
                                          Tracking Status:{" "}
                                          <ul style={{ marginLeft: "5%" }}>
                                            <li>
                                              Status:{" "}
                                              {track?.tracking_status &&
                                                track?.tracking_status.status}
                                            </li>
                                            <li>
                                              Substatus:{" "}
                                              {track?.tracking_status &&
                                                track.tracking_status.substatus
                                                  .text}
                                            </li>
                                            <li>
                                              Status Date:{" "}
                                              {track?.tracking_status &&
                                                new Date(
                                                  track.tracking_status.status_date
                                                ).toDateString()}
                                            </li>
                                            <li>
                                              Location:{" "}
                                              {(track?.tracking_status &&
                                                track.tracking_status.location
                                                  .city) ||
                                                ""}
                                              ,{" "}
                                              {(track?.tracking_status &&
                                                track.tracking_status.location
                                                  .state) ||
                                                ""}
                                              ,{" "}
                                              {(track?.tracking_status &&
                                                "zip: " +
                                                  track.tracking_status.location
                                                    .zip) ||
                                                ""}
                                              ,{" "}
                                              {(track?.tracking_status &&
                                                track.tracking_status.location
                                                  .country) ||
                                                ""}
                                            </li>
                                            {/* </a> */}
                                          </ul>
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                  <div
                                    className={`flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] ${
                                      track.track == "Confirm Order"
                                        ? "before:bg-green-500"
                                        : "before:bg-primarycolor"
                                    }`}
                                  >
                                    <h3 className="text-xl font-semibold tracking-wide">
                                      Confirm Order
                                    </h3>
                                  </div>
                                </div>
                              ) : (
                                <h5 className="mt-4 text-xl font-semibold tracking-wide">
                                  Your order is canceled by the seller! Your
                                  amount will be refunded soon.
                                </h5>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    </Modal>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default GetUserbuyed;
