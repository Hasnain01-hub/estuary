import React from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { db } from "../../utils/Firebase";
import { loginSuccess } from "../../reducer";
const Userform = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [userdata, setuserdata] = React.useState({});
  React.useEffect(() => {
    if (user && user.email) {
      setuserdata(user);
    }
    //setloading(true);
  }, [user]);

  const onChange = (e) => {
    setuserdata({ ...userdata, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await db.collection("users").doc(user.email).update({
      name: userdata.name,
      email: userdata.email,
      // url: userdata.url,
      country: userdata?.country,
      state: userdata?.state,
      postalCode: userdata?.postalCode,
      city: userdata?.city,
      street: userdata?.street,
      date: userdata.date,
      lastname: userdata?.lastname,
      size: userdata?.size,
      // stripe_id: userdata?.stripe_id ?? null,
      phone: userdata?.phone,
      //address: userdata?.address,
      // role: userdata.role,
    });
    dispatch(
      loginSuccess({
        name: userdata.name,
        email: userdata.email,
        url: userdata.url,
        date: userdata.date,
        lastname: userdata?.lastname,
        size: userdata?.size,
        gender: userdata?.gender,
        stripe_id: userdata?.stripe_id,
        phone: userdata?.phone,
        country: userdata?.country,
        state: userdata?.state,
        postalCode: userdata?.postalCode,
        city: userdata?.city,
        street: userdata?.street,
        isListed: userdata?.isListed ? userdata?.isListed : 0,
        //address: userdata?.address,
        role: userdata.role,
      })
    );
    toast.success("successfully updated");
    // router.push("/profile/user");
  };
  return (
    <>
      <Layout>
        <div className="py-20 lg:py-24">
          <div className="cardui">
            <form onSubmit={onSubmit}>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  style={{ borderRadius: "0px", color: "white" }}
                  name="name"
                  id="floating_email"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={userdata.name}
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
                  name="lastname"
                  id="floating_password"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={userdata?.lastname}
                  required
                />
                <label
                  for="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Last name
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
                    className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    value={userdata?.size}
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
                    type="tel"
                    style={{ borderRadius: "0px", color: "white" }}
                    // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="phone"
                    id="floating_phone"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={userdata.phone}
                    required
                  />
                  <label
                    for="floating_first_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Phone
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-3 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="country"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={userdata.country}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    value={userdata.state}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
                    value={userdata.city}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    City
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="postalCode"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={userdata.postalCode}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Postal Code
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <input
                    onChange={onChange}
                    type="text"
                    style={{ borderRadius: "0px", color: "white" }}
                    name="street"
                    id="floating_last_name"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={userdata.street}
                    required
                  />
                  <label
                    for="floating_last_name"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Street
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
      </Layout>
    </>
  );
};

export default Userform;
