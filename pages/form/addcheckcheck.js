import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../components/layout/Layout";
import Image from "next/image";
import shoe from "../../components/asset/btn/shoe-btn.png";
import barcode from "../../components/asset/btn/barcode-btn.png";
import innersole from "../../components/asset/btn/sole-btn.png";
import stich from "../../components/asset/btn/inner-sole.png";
import tag from "../../components/asset/btn/tag-btn.png";
import code from "../../components/asset/btn/up-tag-btn.png";

// import { Avatar, Badge } from "antd";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import axios from "axios";
import { set } from "lodash";
const antIcon = (
  <LoadingOutlined style={{ fontSize: 34, margin: "0px auto" }} spin />
);

const brands = [
  {
    id: 1,
    title: "Air Jordan",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-01.png",
    public: 1,
  },
  {
    id: 2,
    title: "Nike",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-02.png",
    public: 1,
  },
  {
    id: 3,
    title: "Adidas",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-03.png",
    public: 1,
  },
  {
    id: 4,
    title: "Yeezy",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-04.png",
    public: 1,
  },
  {
    id: 6,
    title: "Reebok",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/REEBOK.png",
    public: 1,
  },
  {
    id: 7,
    title: "Puma",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-07.png",
    public: 1,
  },
  {
    id: 8,
    title: "New Balance",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-08.png",
    public: 1,
  },
  {
    id: 10,
    title: "Converse",
    icon_image_url: "https://d3zmmvpz4wyhe.cloudfront.net/logo-10.png",
    public: 1,
  },
];
//5,1,4
const initialstate = {
  brand_id: "",
  category_id: "",
  product_title: "",
  service_level_id: "4",
  user_remark: null,
  status: null,
  images: [],
};
const Addcheckcheck = () => {
  const [sneaker, setSneaker] = useState(initialstate);
  const [catogery, setcatogery] = useState();
  const [image, setimages] = useState({ images: [] });
  const [brand_tit, setbrand_tit] = useState("");

  const [loading, setloading] = useState(false);
  const onselectChange = async (e) => {
    if (e.target.value != "select") {
      var id = brands[e.target.value].id;
      setloading(true);
      //console.log(brands[e.target.value].title);

      //setSneaker({ ...sneaker, brand_id: e.target.value });
      let headersList = {
        Accept: "*/*",
        Authorization:
          "Bearer 2e22356c50d68f2fbc617e88649b6de3f01adbe36f235e52711f5aa45870f9df",
      };

      let reqOptions = {
        url: `https://api.getcheckcheck.com/client/v1/product_category?&brand_id=${id}`,
        method: "GET",
        headers: headersList,
      };
      await axios
        .request(reqOptions)
        .then((res) => {
          setcatogery(res.data.data);
          setSneaker({
            ...sneaker,
            category_id: res.data.data[0]?.id,
            brand_id: id,
            product_title: res.data.data[0]?.title,
          });
          setbrand_tit(e.target.value);

          setloading(false);
        })
        .catch((err) => {
          setloading(false);
          console.log(err);
        });
    }
  };
  const onChange = (e) => {
    const product_title = catogery[e.target.value].title;
    const category_id = catogery[e.target.value].id;
    setSneaker({
      ...sneaker,
      category_id: category_id,
      product_title: product_title,
    });
  };
  var image_id;

  //to upload images to cloudinary
  const upload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "carrer");

    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dpwustwce/image/upload",
      formData
    );
    return { public_id: data?.public_id, url: data?.secure_url };
  };

  //to remove uploaded images from cloudinary
  const remove = async (public_id) => {
    image_id = public_id;
    try {
      await axios.delete(
        `https://api.cloudinary.com/v1_1/dpwustwce/image/destroy/${image_id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  const convertToBinary = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result.split(",")[1]);
      };

      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
    // return new Promise((resolve, reject) => {
    //   const reader = new FileReader();

    //   reader.onload = function () {
    //     const base64String = reader.result.split(",")[1]; // Extract the Base64 data
    //     console.log(base64String);
    //     resolve(base64String);
    //   };
    //   reader.onerror = function (error) {
    //     console.log("Error: ", error);
    //     reject(error);
    //   };
    //   reader.readAsDataURL(file);
    // });
  };
  const checkupload = async (files) => {
    const base64 = await convertToBinary(files);
    const date = new Date();
    // var formData = new FormData();
    // formData.append("file", files);
    var headersList = {
      Accept: "*/*",
      Authorization:
        "Bearer 2e22356c50d68f2fbc617e88649b6de3f01adbe36f235e52711f5aa45870f9df",
    };
    console.log(
      files.name.split(".")[0] +
        `-` +
        date.toISOString() +
        "." +
        files.type.split("/")[1]
    );
    var reqOptions = {
      url: `https://api.getcheckcheck.com/client/v2/asset_image/signurl?filename=${
        files.name.split(".")[0] + `-` + date.toISOString()
      }.${files.type.split("/")[1]}`,
      method: "GET",
      headers: headersList,
    };
    let response = await axios.request(reqOptions);
    console.log(response.data.uploadUrl);
    const headersputList = {
      Accept: "*/*",
      "Content-Type": files.type,
      // "Access-Control-Allow-Origin": "*",
      // Accept: "*/*",
    };

    const putOptions = {
      url: response.data.uploadUrl,
      method: "PUT",
      headers: headersputList,
      data: base64,

      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    };
    // await fetch(response.data.uploadUrl, {
    //   method: "PUT",
    //   body: JSON.stringify(base64),
    //   headers: headersputList,
    // }).then((doc) => {
    //   console.log(doc);
    // });
    // await axios
    //   .request(putOptions)
    //   .then((doc) => {
    //     console.log(doc);
    //   })
    //   .catch(() => console.log("error"));

    console.log(base64);

    await axios
      .post("/api/check-check", {
        base64: base64,
        type: files.type,
        responseurl: response.data.uploadUrl,
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("response", response.data.uploadUrl);
    var res = {
      url: response.data.uploadUrl.split("?")[0],
    };

    console.log("final res", response.data.uploadUrl);

    // console.log("last res", lastres);
    return res;
  };
  //Iterate through all the images and pass to upload function
  const fileUploadAndResize = async (e) => {
    // console.log(
    //   `https://api.getcheckcheck.com/client/v2/asset_image/signurl?filename=${
    //     e.target.files[0].name.split(".")[0] + date.toISOString()
    //   }.${e.target.files[0].type.split("/")[1]}`
    // );
    try {
      let files = e.target.files;

      let allUploadedFiles = image.images;
      if (files) {
        console.log(files);
        setloading(true);
        for (let i = 0; i < files.length; i++) {
          const imgData = await checkupload(files[i]);
          allUploadedFiles.push(imgData);
          setloading(false);
        }
        setimages({ ...image, images: allUploadedFiles });
      }
    } catch (err) {
      setloading(false);
      console.log(err);
    }
  };

  //To remove file from cloudinary
  const handleImageRemove = (public_id) => {
    setloading(true);
    remove(public_id)
      .then((res) => {
        setloading(false);
        const { images } = image;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setimages({ ...image, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
      });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (image.images.length >= 6) {
      if (sneaker.brand_id && sneaker.category_id && sneaker.product_title) {
        var imagedata = [];

        image.images.map((img, idx) =>
          imagedata.push({
            image_url: img.url,
            format: "image/*",
            height: null,
            width: null,
            user_comment: `{"index":${idx}}`,
          })
        );
        // setSneaker({
        //   ...sneaker,
        //   images: imagedata,
        // });
        const sneak_data = {
          ...sneaker,
          images: imagedata,
        };
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization:
            "Bearer 2e22356c50d68f2fbc617e88649b6de3f01adbe36f235e52711f5aa45870f9df",
        };

        let reqOptions = {
          url: `https://api.getcheckcheck.com/client/v2/user/product_check_request`,
          method: "POST",
          data: JSON.stringify(sneak_data),
          headers: headersList,
        };

        await axios
          .request(reqOptions)
          .then((res) => {
            console.log(res);
            toast.success("Sneaker sent to check-check successfully");
            setSneaker(initialstate);
          })
          .catch((err) => {
            console.log(err);
          });

        console.log(sneak_data);
      } else {
        toast.error("Please select brand and category");
      }
    } else {
      toast.error("Please upload 6 images");
    }
  };
  return (
    <>
      <Layout>
        {/* {console.log(image)} */}
        <div className="py-20 lg:py-24">
          {loading ? (
            <Spin style={{ display: "block" }} indicator={antIcon} />
          ) : (
            <div className="cardui">
              <form onSubmit={onSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    style={{ borderRadius: "0px", color: "white" }}
                    name="brand_id"
                    value={brand_tit}
                    id="floating_email"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={onselectChange}
                  >
                    {!sneaker.brand_id ? (
                      <option value="select">Select</option>
                    ) : null}
                    {brands.map((brand, idx) => (
                      <option value={idx}>{brand.title}</option>
                    ))}
                  </select>
                  <label
                    for="floating_email"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Brand
                  </label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                  <select
                    style={{ borderRadius: "0px", color: "white" }}
                    name="category_id"
                    id="floating_password"
                    //value={sneaker.product_title}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    onChange={onChange}
                  >
                    {catogery ? (
                      catogery.map((catogery_data, idx) => (
                        <option value={idx}>{catogery_data.title}</option>
                      ))
                    ) : (
                      <option value="select">Select</option>
                    )}
                  </select>
                  <label
                    for="floating_password"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Category
                  </label>
                </div>
                <h2 className=" font-light text-gray-800 text-left text-white-300 mb-2 capitalize">
                  Upload Product Images
                </h2>
                <div className="grid grid-cols-3 place-items-center md:grid-cols-7 gap-3 ">
                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        // background: "white",
                        width: "85px",
                        height: "85px",
                        // position: "absolute",
                        // color: "#fff",
                        cursor: image.images[0] ? "not-allowed" : "pointer",
                        background: image.images[0] ? "#dcd6d6" : "#fff",
                        border: "1px solid #011b69",
                        padding: "8px",
                        borderRadius: "10px",
                        transition: ".4s ease all",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "50px",
                          float: "left",
                          fontSize: "10px",
                          background: "#011b69",
                          color: "#fff",
                        }}
                      >
                        {" "}
                        Appearance
                      </span>
                      <label

                      // className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <Image src={shoe} className="image-btn" />
                        <input
                          style={{ borderRadius: "0px", color: "white" }}
                          //name="images"
                          type="file"
                          hidden
                          disabled={image.images[0] ? true : false}
                          //multiple={false}
                          accept="image/*"
                          onChange={fileUploadAndResize}
                        />
                      </label>
                    </div>
                  </div>
                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        cursor: image.images[1] ? "not-allowed" : "pointer",
                        background: image.images[1] ? "#dcd6d6" : "#fff",
                        width: "85px",
                        height: "85px",
                        // position: "absolute",
                        // color: "#fff",
                        border: "1px solid #011b69",
                        padding: "8px",
                        borderRadius: "10px",
                        transition: ".4s ease all",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "50px",
                          float: "left",
                          fontSize: "10px",
                          background: "#011b69",
                          color: "#fff",
                        }}
                        // className="mb-1"
                      >
                        {" "}
                        Inside Label
                      </span>
                      <label>
                        <Image src={barcode} className="image-btn" />
                        <input
                          style={{ borderRadius: "0px", color: "white" }}
                          //name="images"
                          type="file"
                          hidden
                          disabled={image.images[1] ? true : false}
                          //multiple={false}
                          accept="image/*"
                          onChange={fileUploadAndResize}
                        />
                      </label>
                    </div>
                  </div>

                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        cursor: image.images[2] ? "not-allowed" : "pointer",
                        background: image.images[2] ? "#dcd6d6" : "#fff",
                        width: "85px",
                        height: "85px",
                        // position: "absolute",
                        // color: "#fff",
                        border: "1px solid #011b69",
                        padding: "8px",
                        borderRadius: "10px",
                        transition: ".4s ease all",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "50px",
                          float: "left",
                          fontSize: "10px",
                          background: "#011b69",
                          color: "#fff",
                        }}
                        // className="mb-1"
                      >
                        {" "}
                        Back of Insole
                      </span>
                      <label>
                        <Image src={innersole} className="image-btn" />
                        <input
                          style={{ borderRadius: "0px", color: "white" }}
                          //name="images"
                          type="file"
                          disabled={image.images[2] ? true : false}
                          hidden
                          //multiple={false}
                          accept="image/*"
                          onChange={fileUploadAndResize}
                        />
                      </label>
                    </div>
                  </div>
                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        cursor: image.images[3] ? "not-allowed" : "pointer",
                        background: image.images[3] ? "#dcd6d6" : "#fff",
                        width: "85px",
                        height: "85px",
                        // position: "absolute",
                        // color: "#fff",
                        border: "1px solid #011b69",
                        padding: "8px",
                        borderRadius: "10px",
                        transition: ".4s ease all",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "50px",
                          float: "left",
                          fontSize: "10px",
                          background: "#011b69",
                          color: "#fff",
                        }}
                        // className="mb-1"
                      >
                        {" "}
                        Insole Stitching
                      </span>
                      <label>
                        <Image src={stich} className="image-btn" />
                        <input
                          style={{ borderRadius: "0px", color: "white" }}
                          //name="images"
                          type="file"
                          disabled={image.images[3] ? true : false}
                          hidden
                          //multiple={false}
                          accept="image/*"
                          onChange={fileUploadAndResize}
                        />
                      </label>
                    </div>
                  </div>
                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        cursor: image.images[4] ? "not-allowed" : "pointer",
                        background: image.images[4] ? "#dcd6d6" : "#fff",
                        width: "85px",
                        height: "85px",
                        // position: "absolute",
                        // color: "#fff",
                        border: "1px solid #011b69",
                        padding: "8px",
                        borderRadius: "10px",
                        transition: ".4s ease all",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "50px",
                          float: "left",
                          fontSize: "10px",
                          background: "#011b69",
                          color: "#fff",
                        }}
                        // className="mb-1"
                      >
                        {" "}
                        Box Label
                      </span>
                      <label>
                        <Image src={tag} className="image-btn" />
                        <input
                          style={{ borderRadius: "0px", color: "white" }}
                          //name="images"
                          type="file"
                          hidden
                          disabled={image.images[4] ? true : false}
                          //multiple={false}
                          accept="image/*"
                          onChange={fileUploadAndResize}
                        />
                      </label>
                    </div>
                  </div>
                  <div style={{ height: "80px" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        textAlign: "center",
                        cursor: image.images[5] ? "not-allowed" : "pointer",
                        background: image.images[5] ? "#dcd6d6" : "#fff",
                        width: "85px",
                        height: "85px",
                        // position: "absolute",
                        // color: "#fff",
                        border: "1px solid #011b69",
                        padding: "8px",
                        borderRadius: "10px",
                        transition: ".4s ease all",
                      }}
                    >
                      <span
                        style={{
                          padding: "5px 8px",
                          borderRadius: "50px",
                          float: "left",
                          fontSize: "10px",
                          background: "#011b69",
                          color: "#fff",
                        }}
                        // className="mb-1"
                      >
                        {" "}
                        Date Code
                      </span>
                      <label>
                        <Image src={code} className="image-btn" />
                        <input
                          style={{ borderRadius: "0px", color: "white" }}
                          //name="images"
                          type="file"
                          hidden
                          disabled={image.images[5] ? true : false}
                          //multiple={false}
                          accept="image/*"
                          onChange={fileUploadAndResize}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <br />
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
          )}
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Addcheckcheck;
