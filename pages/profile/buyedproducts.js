import { Pagination } from "antd";
import React from "react";
import Layout from "../../components/layout/Layout";
import { Skeleton } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { sum, compact } from "lodash";
import { Button, Modal } from "antd";
import SeoHead from "../../components/SeoHead";

const buyedproducts = () => {
  const [buyed, setbuyed] = React.useState([]);
  const [track, settrack] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const showModal = (e, p) => {
    e.preventDefault();
    settrack({
      track: p.prod_status[p.no].status,
      spent: p.spent,
      name: p.name,
      brand: p.shoeName,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [buyedpage, setbuyedPage] = React.useState(1);

  const [buyedcount, setbuyedcount] = React.useState();
  const [buyedloading, setbuyedloading] = React.useState(false);
  const { user } = useSelector((state) => state.user);
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
          if (item.user.email == user.email) {
            // price = price + pro.discount_price;
            return {
              _id: item._id,
              no: idnx,
              prod_status: item?.prod_status,
              name: pro.name,
              phone: pro.phone,
              email: pro.email,
              spent: pro.discount_price,
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

      setbuyedcount(final_result.length);
      if (final_result.length > 0) {
        //setotal(sum(final_result.map((i) => i.spent)));
      }

      // setbuyed();
      if (buyedpage == 1) {
        setbuyed(final_result.slice(0, 6));
      } else {
        setbuyed(final_result.slice(6 * (buyedpage - 1), 6 * buyedpage));
      }
      setbuyedloading(true);
    }
  };
  React.useEffect(() => {
    getdat(user);
  }, [user, buyedpage]);
  return (
    <>
      <SeoHead title="Buyed" />
      <Layout>
        <div className=" py-20 lg:py-24">
          <div className="containerwidth mx-auto px-4">
            <div>
              {buyedloading ? (
                buyed.length > 0 ? (
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

                                <div className="flex item-center justify-between mt-3">
                                  <h1 className="text-gray-700 font-bold text-xl">
                                    ${Math.round(p.spent)}
                                  </h1>
                                  <div>
                                    <button
                                      onClick={(e) => showModal(e, p)}
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
                        onChange={(buyedpage) => setbuyedPage(buyedpage)}
                        total={Math.floor((buyedcount / 6) * 10)}
                      />
                    </div>
                  </>
                ) : (
                  <h2 className="font-semibold text-gray-800 text-center">
                    No Sneakers Buyed
                  </h2>
                )
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
        <Modal
          //title="Basic Modal"
          width={1000}
          centered
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            // <Button key="back" onClick={handleCancel}>
            //   Cancel
            // </Button>,
            <Button
              key="submit"
              style={{ background: "#c81e1d" }}
              type="primary"
              onClick={handleOk}
            >
              Close
            </Button>,
          ]}
        >
          <section className="dark:bg-gray-800 dark:text-gray-100">
            <div className="container max-w-5xl px-4 py-12 mx-auto">
              <div className="grid gap-4  sm:grid-cols-12">
                <div className="col-span-12 sm:col-span-3">
                  <div className="text-center sm:text-left mb-14 before:block sm:before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto before:mx-0 before:bg-primarycolor">
                    <h3 className="text-3xl font-semibold">{track.brand}</h3>
                    <span className="text-sm font-bold tracking-wider uppercase dark:text-gray-400">
                      By&nbsp;{track?.name}
                    </span>
                  </div>
                </div>
                <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                  <div className="col-span-12 space-y-12 relative px-4 col-span-8 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-3 before:bg-primarycolor">
                    <div
                      className={`flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] ${
                        track.track == "Delivered"
                          ? "before:bg-green-500"
                          : "before:bg-primarycolor"
                      }`}
                    >
                      <h3 className="text-xl font-semibold tracking-wide">
                        Delivered
                      </h3>
                      {/* <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                        Dec 2020
                      </time>
                      <p className="mt-3">
                        Pellentesque feugiat ante at nisl efficitur, in mollis
                        orci scelerisque. Interdum et malesuada fames ac ante
                        ipsum primis in faucibus.
                      </p> */}
                    </div>
                    <div
                      className={`flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:left-[-35px] before:z-[1] ${
                        track.track == "Out for delivery"
                          ? "before:bg-green-500"
                          : "before:bg-primarycolor"
                      }`}
                    >
                      <h3 className="text-xl font-semibold tracking-wide">
                        Out for delivery
                      </h3>
                      {/* <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                        Jul 2019
                      </time>
                      <p className="mt-3">
                        Morbi vulputate aliquam libero non dictum. Aliquam sit
                        amet nunc ut diam aliquet tincidunt nec nec dui. Donec
                        mollis turpis eget egestas sodales.
</p> */}
                    </div>
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
                      {/* <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                        Jul 2019
                      </time>
                      <p className="mt-3">
                        Morbi vulputate aliquam libero non dictum. Aliquam sit
                        amet nunc ut diam aliquet tincidunt nec nec dui. Donec
                        mollis turpis eget egestas sodales.
</p> */}
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
                      {/* <time className="text-xs tracking-wide uppercase dark:text-gray-400">
                        Jan 2016
                      </time>
                      <p className="mt-3">
                        Suspendisse tincidunt, arcu nec faucibus efficitur,
                        justo velit consectetur nisl, sit amet condimentum lacus
                        orci nec purus. Mauris quis quam suscipit, vehicula
                        felis id, vehicula enim.
                      </p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Modal>
      </Layout>
    </>
  );
};

export default buyedproducts;
