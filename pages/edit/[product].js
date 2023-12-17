import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import "remixicon/fonts/remixicon.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import axios from "axios";
import _ from "lodash";
export const getStaticPaths = async () => {
  const res = await axios.get(
    "https://sneaker-api-phi.vercel.app/getallsneaker"
  );
  const data = await res.data;
  const paths = data.map((sneak) => {
    return {
      params: {
        product: sneak._id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const path = context.params.product;
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
const EditProduct = ({ pdata }) => {
  const initialstate = {
    name: "",
    email: "",
    styleID: "",
    phone: "",
    size: "",
    discount_price: "",
    description: "",
  };
  const [sneaker, setSneaker] = React.useState(initialstate);
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user && user.email) {
      setSneaker({
        ...pdata[0],
        name: pdata[0].name,
        email: pdata[0].email,
        styleID: pdata[0].styleID,
        size: pdata[0].size,
        discount_price: Math.round(pdata[0].discount_price),
        phone: pdata[0]?.phone,
        description: pdata[0].description,
      });
    }
  }, [user]);

  const handleadd = async (e) => {
    e.preventDefault();
    if (user) {
      //https://sneaker-api-phi.vercel.app
      const data = {
        ...sneaker,
        description: sneaker.description,
        size: sneaker.size,
        discount_price: parseInt(sneaker.discount_price),
      };
      //https://sneaker-api-phi.vercel.app

      await axios
        .post(
          "https://sneaker-api-phi.vercel.app/editsneaker",
          { product: data, id: pdata[0]._id },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(async (res) => {
          toast.success("Sneaker added successfully");
          setSneaker(initialstate);
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
      <Layout>
        <div className="py-20 lg:py-24">
          <div className="cardui">
            <form onSubmit={handleadd}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  style={{ borderRadius: "0px", color: "white" }}
                  name="name"
                  disabled
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
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  onChange={onChange}
                  type="text"
                  style={{ borderRadius: "0px", color: "white" }}
                  name="styleID"
                  disabled
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={sneaker.styleID}
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
                    name="discount_price"
                    id="floating_repeat_password"
                    className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={Math.round(sneaker.discount_price)}
                  />
                  <label
                    for="floating_repeat_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Price
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="tel"
                    disabled
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
                    name="description"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sneaker.description}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description
                  </label>
                </div>
              </div>
              {/* <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="tel"
                    style={{ borderRadius: "0px", color: "white" }}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="floating_phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_phone"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone number (123-456-7890)
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="floating_company"
                    id="floating_company"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                  />
                  <label
                    for="floating_company"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Company (Ex. Google)
                  </label>
                </div>
              </div> */}
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
      </Layout>
    </>
  );
};

export default EditProduct;
